import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { GmailService } from './gmail.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateGmailPdfDto } from './dto/create-gmail-pdf.dto';

@Controller('gmail')
export class GmailController {
  constructor(private readonly gmailService: GmailService) {}

  @Patch('send-email/:stripeOperationId')
  async sendEmailPdf(@Param('stripeOperationId') stripeOperationId: string, @Param('paymentMethodId') paymentMethodId: string,@Body() createGmailPdfDto: CreateGmailPdfDto) {
    await this.gmailService.sendEmailWithPdf(stripeOperationId,paymentMethodId,createGmailPdfDto);
    return { message: 'Correo con PDF enviado satisfactoriamente' };
  }
}