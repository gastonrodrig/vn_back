import { Controller, Post, Body } from '@nestjs/common';
import { GmailTemporalService } from './gmailTemporal.service';
import { SendEmailDto } from './dto/send-email.dto';
import { SendTemporaryAccountDto } from './dto/send-temporary-account.dto';


@Controller('gmail')
export class GmailTemporalController {
  constructor(private readonly gmailTemporalService: GmailTemporalService) {}

  // Endpoint para enviar un correo genérico
  @Post('send-email')
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    const { to, subject, text } = sendEmailDto;
    await this.gmailTemporalService.sendEmail(to, subject, text);
    return { message: 'Correo enviado exitosamente' };
  }

  // Endpoint para enviar un correo con la cuenta temporal
  @Post('send-temporary-account')
  async sendTemporaryAccount(@Body() sendTemporaryAccountDto: SendTemporaryAccountDto) {
    const { to, username, password } = sendTemporaryAccountDto;
    await this.gmailTemporalService.sendTemporaryAccountEmail(to, username, password);
    return { message: 'Correo con cuenta temporal enviado exitosamente' };
  }
}