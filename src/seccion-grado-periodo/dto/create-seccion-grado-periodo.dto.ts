import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreateSeccionGradoPeriodoDto {
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
}
