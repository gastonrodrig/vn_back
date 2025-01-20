import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateGmailPdfDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email del destinatario',
  })
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    example: 'Constancia de pago - Virgen de la Natividad',
    description: 'Asunto del email',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: '12345678', description: 'DNI del apoderado' })
  @IsString()
  @IsNotEmpty()
  dni: string;
}
