import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, IsDateString,IsNumber, IsNotEmpty, IsMongoId, IsOptional } from "class-validator";
import { EstadoPension } from "../enums/estado-pension.enum";
import { MetodoPago } from "../enums/metodo-pago.enum";

export class CreatePensionDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  estudiante_id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  monto: number;
   
  @ApiProperty({ example: '2024-12-15' })
  @IsString()
  @IsNotEmpty()
  fecha_inicio: string;

  @ApiProperty({ example: '2024-03-18' })
  @IsString()
  @IsNotEmpty()
  fecha_limite: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mes: string;
}