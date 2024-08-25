import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreateGradoCursoHorasDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  grado_id: string;
  
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  curso_id: string;
}
