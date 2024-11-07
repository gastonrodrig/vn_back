import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNotasDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  estudiante_id: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  docente_id: string;

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
  curso_id: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  bimestre_id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  nota: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  notaLetra: string;
}