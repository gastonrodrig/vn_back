import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EstadoSolicitud } from "../enums/estado-solicitud.enum";

export class CreateSolicitudDto {

  //LISTO DTO
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre_hijo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  apellido_hijo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  dni_hijo: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  telefono_padre: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  correo_padre: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  grado_ID: string;

  
}