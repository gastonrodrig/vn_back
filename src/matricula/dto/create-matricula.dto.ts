import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TipoRegistro } from "../enums/tipo-registro.enum";
import { PagoStatus } from "src/pago/enums/estado-pago.enum";

export class CreateMatriculaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  monto: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  metodo_pago: string;

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
