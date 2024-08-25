import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  identificador: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  contrasena: string;
}