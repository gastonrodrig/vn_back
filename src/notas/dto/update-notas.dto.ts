import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateNotasDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  nota: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  notaLetra: string;
}