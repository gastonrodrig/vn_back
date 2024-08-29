import { Controller, Post, Body } from '@nestjs/common';
import { GmailService } from './gmail.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateGmailDto } from './dto/create-gmail.dto';

@Controller('gmail')
@ApiTags('Gmail')
export class GmailController {
  constructor(private readonly gmailService: GmailService) {}

  @Post('send')
  @ApiBody({ type: CreateGmailDto })
  async sendEmail(@Body() createEmailDto: CreateGmailDto) {
    const { to, subject, text } = createEmailDto;
    await this.gmailService.sendEmail(to, subject, text);
    return { message: 'Email sent successfully' };
  }
}
