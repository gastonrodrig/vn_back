import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { EstadoAsistencia } from "../enums/estado-asistencia.enum";

export class CreateAsistenciaDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  estudiante_id: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  seccion_id: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  grado_id: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  periodo_id: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  semana_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fecha: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mes: string;

  @ApiProperty()
  @IsEnum(EstadoAsistencia)
  @IsNotEmpty()
  estado: EstadoAsistencia;

}