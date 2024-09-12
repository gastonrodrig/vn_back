import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { TipoRegistro } from "../enums/tipo-registro.enum";
import { MetodoPago } from "../enums/metodo-pago.enum";

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
  @IsNotEmpty()
  n_operacion: string;

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
}
