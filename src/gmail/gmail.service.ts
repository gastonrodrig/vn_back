import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { CreateGmailPdfDto } from './dto/create-gmail-pdf.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import puppeteer from 'puppeteer';
import { StripeService } from 'src/stripe/stripe.service';
import { Pago } from 'src/pago/schema/pago.schema';

@Injectable()
export class GmailService {
  private oauth2Client;
  private transporter;

  constructor(
    @InjectModel(Pago.name)
    private readonly pagoModel: Model<Pago>,
    private readonly stripeService: StripeService,
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );

    this.oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    this.setupTransporter();
  }

  private async setupTransporter() {
    const accessToken = await this.oauth2Client.getAccessToken();
    if (!accessToken) {
      throw new Error('Failed to retrieve access token');
    }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });
  }

  async sendEmailWithPdf(stripeOperationId: string, dto: CreateGmailPdfDto) {
    const pago = await this.pagoModel.findOne({ stripeOperationId }).exec();
    if (!pago) {
      throw new BadRequestException(
        'No se encontró el pago con el stripeOperationId proporcionado.',
      );
    }
    const { paymentIntent, paymentDate } =
      await this.stripeService.getPaymentDetails(stripeOperationId);

    const pdfBuffer = await this.generatePdf(pago, paymentIntent, paymentDate);

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: dto.to,
      subject: dto.subject,
      text: 'Se adjunta la boleta del pago de matricula.',
      attachments: [
        {
          filename: `VIRGEN_NATIVIDAD_BOLETA.pdf`,
          content: pdfBuffer,
        },
      ],
    };

    await this.transporter.sendMail(mailOptions);
  }

  private async generatePdf(
    pago: Pago,
    paymentIntent: any,
    paymentDate: string,
  ): Promise<Buffer> {
    const montoTotal = paymentIntent.amount / 100;
    const montoBase = (montoTotal / 1.18).toFixed(2);
    const igv = (montoTotal - parseFloat(montoBase)).toFixed(2);

    const tipoDocumento = pago.metadata?.tipoDocumento;
    const esFactura = tipoDocumento === 'Ruc';
    const titulo = esFactura ? 'Factura Nº001-24' : 'Boleta Nº001-24';

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${titulo}</title>
      </head>
      <body>
          <header>
              <h2 style="text-align:center; font-size: 18px; font-weight: bold; margin: 20px 0;">${titulo}</h2>
          </header>
          <section style="text-align:center; font-size: 14px;">
              <p><strong>Colegio Virgen de la Natividad</strong></p>
              <p>Av. Test 354, Urbanización Chorrillos</p>
              <p>Teléfono: (01)555-555</p>
              <p>Correo: virgen-natividad@gmail.com</p>
          </section>
          <section style="font-size: 14px; margin-top: 20px;">
              <h3 style="font-size: 16px; font-weight: bold;">Detalles del Cliente:</h3>
              <p>Nombre del cliente: ${pago.nombre_completo}</p>
              <p>${esFactura ? 'RUC' : 'DNI'}: ${pago.metadata?.nroDocumento || 'No registrado'}</p>
              <p>Dirección: ${pago.metadata?.direccion || 'No registrada'}</p>
          </section>
          <section style="font-size: 14px; margin-top: 20px;">
              <h3 style="font-size: 16px; font-weight: bold;">Detalle del Servicio:</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <thead style="background-color: #657cae; color: white; text-align: left;">
                      <tr>
                          <th style="padding: 8px;">Descripción</th>
                          <th style="padding: 8px;">Cantidad</th>
                          <th style="padding: 8px;">Precio Unitario</th>
                          <th style="padding: 8px;">Subtotal</th>
                      </tr>
                  </thead>
                  <tbody style="background-color: #f9f9f9;">
                      <tr>
                          <td style="padding: 8px;">MATRÍCULA ALUMNO</td>
                          <td style="padding: 8px;">1</td>
                          <td style="padding: 8px; text-align: right;">S/. ${montoBase}</td>
                          <td style="padding: 8px; text-align: right;">S/. ${montoBase}</td>
                      </tr>
                      <tr>
                          <td colspan="3" style="padding: 8px;">IGV (18%)</td>
                          <td style="padding: 8px; text-align: right;">S/. ${igv}</td>
                      </tr>
                      <tr>
                          <td colspan="3" style="padding: 8px; font-weight: bold;">Total</td>
                          <td style="padding: 8px; font-weight: bold; text-align: right;">S/. ${montoTotal}</td>
                      </tr>
                  </tbody>
              </table>
          </section>
          <section style="font-size: 14px; margin-top: 20px;">
              <h4 style="font-size: 16px; font-weight: bold;">Información del Pago:</h4>
              <p>Monto Total Pagado: S/. ${montoTotal.toFixed(2)}</p>
              <p>Estado del Pago: ${paymentIntent.status}</p>
              <p>Fecha de Operación: ${paymentDate}</p>
          </section>
          <footer style="text-align: center; font-size: 12px; margin-top: 30px; color: #666;">
              <p>Gracias por su pago. Si tiene alguna consulta, no dude en contactarnos.</p>
              <p>Dirección: Av. Test 354, Urbanización Chorrillos</p>
              <p>Teléfono: (01)555-555</p>
              <p>Correo: virgen-natividad@gmail.com</p>
          </footer>
      </body>
      </html>
    `;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.setContent(htmlContent);

    await page.addStyleTag({
      content: `
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 20px;
          color: #333;
          font-size: 14px;
        }
  
        header {
          text-align: center;
          margin-bottom: 20px;
        }
  
        header h2 {
          font-size: 20px;
          margin: 0;
          color: #444;
        }
  
        section {
          margin-bottom: 20px;
        }
  
        section h3 {
          margin-bottom: 10px;
          font-size: 16px;
          color: #444;
        }
  
        section p {
          margin: 5px 0;
        }
  
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
  
        thead {
          background-color: #657cae;
          color: #fff;
        }
  
        thead th {
          text-align: left;
          padding: 8px;
          font-size: 14px;
        }
  
        tbody tr:nth-child(even) {
          background-color: #f9f9f9;
        }
  
        tbody td {
          padding: 8px;
          font-size: 13px;
          text-align: right;
        }
  
        tbody td:first-child {
          text-align: left;
        }
  
        tfoot td {
          font-weight: bold;
          font-size: 14px;
          text-align: right;
          padding: 8px;
        }
  
        tfoot td:first-child {
          text-align: left;
        }
  
        .footer {
          text-align: center;
          font-size: 12px;
          margin-top: 30px;
          color: #666;
        }
  
        .footer p {
          margin: 5px 0;
        }
      `,
    });

    await page.emulateMediaType('screen');

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '20mm', bottom: '20mm', left: '10mm', right: '10mm' },
    });

    await browser.close();
    return Buffer.from(pdfBuffer);
  }
}
