import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreatePeriodoSeccionCursoDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  periodo_id: string;
  
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  seccion_id: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  curso_id: string;
}
