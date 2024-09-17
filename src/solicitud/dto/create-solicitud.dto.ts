import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateSolicitudDto {
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