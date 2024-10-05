import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreateSeccionCursoDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  seccion_id: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  curso_id: string;
}
