import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateGmailDto {
  @ApiProperty({ example: 'example@gmail.com', description: 'Email del destinatario' })
  @IsEmail()
  to: string;

  @ApiProperty({ example: 'Asunto del Correo', description: 'Asunto del correo electrónico' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ example: 'Este es el contenido del correo.', description: 'Texto del correo electrónico' })
  @IsString()
  @IsNotEmpty()
  text: string;
}
