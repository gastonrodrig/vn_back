import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateHorarioDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  dia_semana: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  hora_inicio: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  hora_fin: string;

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
  curso_id: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  docente_id: string;
}
