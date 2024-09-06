import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import * as PDFDocument from 'pdfkit';
import * as streamBuffers from 'stream-buffers';
import { CreateGmailPdfDto } from './dto/create-gmail-pdf.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Apoderado } from 'src/apoderado/schema/apoderado.schema';
import { Model } from 'mongoose';

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
    // const pdfBuffer = await this.generatePdf(dto.pdfContent);

    const apoderado = await this.apoderadoModel.findOne({ numero_documento: dni })
    if(!apoderado){
      throw new BadRequestException('Apoderado no encontrado');
    }

    const pdfBuffer = await this.generatePdf(apoderado);

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: dto.to,
      subject: dto.subject,
      text: 'Adjunto encontrarás el PDF solicitado.',
      attachments: [
        {
          filename: 'apoderado_dni.pdf',
          content: pdfBuffer,
        },
      ],
    };

    await this.transporter.sendMail(mailOptions);
  }

  private generatePdf(apoderado: Apoderado): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const buffer = new streamBuffers.WritableStreamBuffer();

      doc.pipe(buffer);

      // Agrega información al PDF
      doc.fontSize(25).text(`Nombre: ${apoderado.nombre}`, 100, 100);
      doc.fontSize(25).text(`Apellido: ${apoderado.apellido}`, 100, 130);
      doc.fontSize(25).text(`Número: ${apoderado.numero}`, 100, 160);
      doc.fontSize(25).text(`Correo: ${apoderado.correo}`, 100, 190);
      doc.fontSize(25).text(`Dirección: ${apoderado.direccion}`, 100, 220);
      doc.fontSize(25).text(`Número Documento: ${apoderado.numero_documento}`, 100, 250);

      doc.end();

      buffer.on('finish', () => {
        resolve(buffer.getContents());
      });

      buffer.on('error', (error) => {
        reject(error);
      });
    });
  }
}