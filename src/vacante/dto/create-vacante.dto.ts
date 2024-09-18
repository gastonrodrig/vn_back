import { IsNotEmpty, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { EstadoVacante } from "../enum/estado-vacante.enum";
import { IsMongoId } from "class-validator";

export class CreateVacanteDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  estudiante_id: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  grado_id: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  periodo_id: string;

}