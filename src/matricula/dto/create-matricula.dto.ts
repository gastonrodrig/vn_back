import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { TipoRegistro } from "../enums/tipo-registro.enum";
import { MetodoPago } from "../enums/metodo-pago.enum";
import { tipoMatricula } from "../enums/tipo-matricula.enums";

export class CreateMatriculaDto {
  
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  monto: number;

  @ApiProperty()
  @IsEnum(MetodoPago)
  @IsNotEmpty()
  metodo_pago: MetodoPago;

  @ApiProperty()
  @IsString()
  @IsOptional()
  n_operacion?: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  periodo_id: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  estudiante_id: string;

  @ApiProperty()
  @IsEnum(TipoRegistro)
  @IsNotEmpty()
  tipo: TipoRegistro;

  @ApiProperty()
  @IsEnum(tipoMatricula)
  @IsNotEmpty()
  tipoMa: tipoMatricula;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  fecha: Date;
}
