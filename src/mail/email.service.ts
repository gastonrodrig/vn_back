/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly oauth2Client: OAuth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI,
    );
  }

  async sendEmail(
    destinatario: string,
    asunto: string,
    texto: string,
    files: Express.Multer.File[]| null = null
  ) {
    const refreshToken = process.env.GMAIL_REFRESH_TOKEN;

    this.oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });
    const accessToken = await this.oauth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });

    let attachments = [];
    if (files) {
      attachments = files.map(file => ({
        filename: file.originalname,
        content: file.buffer,
      }));
    }

    const mailOptions = {
      from: 'Test nodmailer',
      to: destinatario,
      subject: asunto,
      text: texto,
      attachments: attachments
    };
    const result = await transporter.sendMail(mailOptions);
    return result;
  }
}
