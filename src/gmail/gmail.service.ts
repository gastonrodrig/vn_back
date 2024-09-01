import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
import * as PDFDocument from 'pdfkit';
import * as streamBuffers from 'stream-buffers';
import { CreateGmailPdfDto } from './dto/create-gmail-pdf.dto';

@Injectable()
export class GmailService {
  private oauth2Client;
  private transporter;

  constructor() {
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
    const pdfBuffer = await this.generatePdf(dto.pdfContent);

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: dto.to,
      subject: dto.subject,
      text: dto.text,
      attachments: [
        {
          filename: 'ejemplo.pdf',
          content: pdfBuffer,
        },
      ],
    };

    await this.transporter.sendMail(mailOptions);
  }

  private generatePdf(content: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const buffer = new streamBuffers.WritableStreamBuffer();

      doc.pipe(buffer);

      doc.fontSize(25).text(content, 100, 100);

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