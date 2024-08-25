import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'La nueva contraseña debe tener al menos 5 caracteres.' })
  newPassword: string;
}