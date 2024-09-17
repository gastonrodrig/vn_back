import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';

@Injectable()
export class GmailTemporalService {
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

  async sendTemporaryAccountEmail(to: string, username: string, password: string) {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject: 'Cuenta Temporal de Acceso',
      text: `Estimado Apoderado,

    Su solicitud esta en proceso. Se ha creado una cuenta temporal para usted. A continuación, le proporcionamos las credenciales de acceso:

    Usuario: ${username}
    Contraseña: ${password}

    Por favor, use estas credenciales para acceder al sistema.

    Saludos cordiales,
    El colegio Virgen de la Natividad.`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async enviarCorreoTemporalCancelado(to: string){
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject: 'Estado de tu solicitud',
      text:`Estimado Apoderado,
    Su solicitud fue cancelada. Cualquier consulta contacte con el numero de contacto: +51 993 773 542
    el colegio Virgen de la Natividad`,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      text,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
