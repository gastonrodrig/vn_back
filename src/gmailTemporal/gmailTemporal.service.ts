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

  // Método para enviar un correo con la cuenta temporal
  async sendTemporaryAccountEmail(to: string, username: string, password: string) {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject: 'Cuenta Temporal de Acceso',
      text: `Estimado Padre/Madre,

      Su solicitud esta en proceso. Se ha creado una cuenta temporal para usted. A continuación, le proporcionamos las credenciales de acceso:

      Usuario: ${username}
      Contraseña: ${password}

      Por favor, use estas credenciales para acceder al sistema.

      Saludos cordiales,
      El colegio Virgen de la Natividad.`,
    };

    // Enviamos el correo
    await this.transporter.sendMail(mailOptions);
  }

  // Método genérico para enviar correos
  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      text,
    };

    // Enviamos el correo
    await this.transporter.sendMail(mailOptions);
  }
}
