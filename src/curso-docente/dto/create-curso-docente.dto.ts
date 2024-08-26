import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateCursoDocenteDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  curso_id: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  docente_id: string;
}