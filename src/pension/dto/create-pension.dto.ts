import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, IsDateString,IsNumber, IsNotEmpty, IsMongoId } from "class-validator";
import { EstadoPension } from "../enums/estado-pension.enum";

export class CreatePensionDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  estudiante_id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  monto: number;
  
  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  fecha_inicio: Date;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  fecha_limite: Date;

  @ApiProperty()
  @IsEnum(EstadoPension)
  @IsNotEmpty()
  estado: EstadoPension;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mes: string;
}