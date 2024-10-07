import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, IsNotEmpty, IsOptional } from "class-validator";
import { EstadoPension } from "../enums/estado-pension.enum";
import { MetodoPago } from "../enums/metodo-pago.enum";

export class PagarPensionDto {
  @ApiProperty()
  @IsEnum(MetodoPago)
  @IsOptional()
  metodo_pago?: MetodoPago;

  @ApiProperty()
  @IsString()
  @IsOptional()
  n_operacion?: string;

  @ApiProperty()
  @IsEnum(EstadoPension)
  @IsNotEmpty()
  estado: EstadoPension;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  tiempo_pago: string;
}