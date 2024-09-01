import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateGmailPdfDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email del destinatario' })
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @ApiProperty({ example: 'Asunto del correo', description: 'Asunto del email' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: 'Contenido del correo', description: 'Texto del email' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: 'Este es un ejemplo de PDF.', description: 'Contenido del PDF' })
  @IsString()
  @IsNotEmpty()
  pdfContent: string;
}
