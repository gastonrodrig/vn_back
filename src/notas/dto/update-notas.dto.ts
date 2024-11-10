import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { TipoNota } from '../enums/tipo-nota.enum';

export class UpdateNotasDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  nota: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  notaLetra: string;

  @ApiProperty()
  @IsEnum(TipoNota)
  @IsNotEmpty()
  tipoNota: TipoNota;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  motivoCambio: string;
}