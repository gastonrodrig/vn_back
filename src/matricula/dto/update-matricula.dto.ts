import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { MetodoPago } from "../enums/metodo-pago.enum";

export class UpdateMatriculaDto {
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
}
