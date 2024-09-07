import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { CreateGmailPdfDto } from './dto/create-gmail-pdf.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Apoderado } from 'src/apoderado/schema/apoderado.schema';
import { Model } from 'mongoose';
import puppeteer from 'puppeteer';

@Injectable()
export class GmailService {
  private oauth2Client;
  private transporter;

  constructor(
    @InjectModel(Apoderado.name)
    private readonly apoderadoModel: Model<Apoderado>
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

  async sendEmailWithPdf(dto: CreateGmailPdfDto) {
    const { to, subject, dni } = dto;

    const apoderado = await this.apoderadoModel.findOne({ numero_documento: dni });
    if (!apoderado) {
      throw new BadRequestException('Apoderado no encontrado');
    }

    const pdfBuffer = await this.generatePdf(apoderado);

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: dto.to,
      subject: dto.subject,
      text: 'Se adjunta la boleta del pago de matricula.',
      attachments: [
        {
          filename: `VIRGEN_NATIVIDAD_${apoderado.numero_documento}.pdf`,
          content: pdfBuffer,
        },
      ],
    };

    await this.transporter.sendMail(mailOptions);
  }

  private async generatePdf(apoderado: Apoderado): Promise<Buffer> {
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Boleta de Compra</title>
    </head>
    <body class="detalleInicial">
        <header class="tituloBoleta">
            <h2>Comprobante de Pago Nº001-24</h2>
        </header>
        <section class="detalleEmpresa">
            <p>Colegio Virgen de la Natividad</p>
            <p>Av. Test 354, Urbanización Chorrillos</p>
            <p>Teléfono: (01)555-555</p>
            <p>Correo: virgen-natividad@gmail.com</p>
        </section>
        <section class="tituloCliente">
            <h2>Detalle Cliente:</h2>
        </section>
        <section class="detalleCliente">
            <p>Nombre del cliente: ${apoderado.nombre} ${apoderado.apellido}</p>
            <p>DNI del cliente: ${apoderado.numero_documento}</p>
        </section>
        <section class="tituloPedido">
            <h2>Detalle del Servicio</h2>
        </section>       
        <table>
            <thead>
                <tr class="contendioCabecera">
                    <th>Servicio</th>
                    <th>Nº Matricula</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Precio Total</th>
                </tr>
            </thead>
            <tbody>
                <tr class="primeraFila">
                    <td>MATRICULA ALUMNO</td>
                    <td>00001</td>
                    <td>1</td>
                    <td>300</td>
                    <td>300</td>
                </tr>
                <tr class="total">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>TOTAL</td>
                    <td>S/.300.00</td>
                </tr>
            </tbody>
        </table>
        
        <section class="detalleFinal">
            <h3>SON: TRECIENTOS SOLES 00/CÉNTIMO</h3>
            <h3>Datos del Pago:</h3>
            <h3>Tipo de Operación: Tarjeta</h3>
            <h3>Fecha de Operación: 2024-09-15</h3>
            <h3>Número de Operación: 1234567890</h3>
        </section>
        
        <footer class="footerBoleta">
            <p>Gracias por su pago de matricula. Si tiene alguna consulta, no dude en contactarnos.</p>
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
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          margin: 2em;
          padding: 0;
        }

        header, section, footer {
          margin: 10px auto;
        }

        .tituloBoleta h2 {
          text-align: center;
          margin: 0;
        }

        .detalleEmpresa p {
          text-align: center;
          margin: 5px 0;
        }

        .tituloCliente h2, .tituloPedido h2, .detalleFinal h3 {
          font-weight: normal;
          margin: 0;
        }

        table {
          width: 100%;
          text-align: left;
          border-collapse: collapse;
          max-width: 1000px;
          margin: 20px auto;
        }

        .contendioCabecera th, .primeraFila td, .total td {
          padding: 10px;
        }

        thead {
          background-color: #657cae;
          color: white;
        }

        .primeraFila td, .total td {
          text-align: right;
        }

        .footerBoleta {
          text-align: center;
          padding: 10px;
          border-top: 1px solid #ddd;
          margin-top: 20px;
          font-size: 14px;
        }
      `
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