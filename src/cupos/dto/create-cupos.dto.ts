import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCuposDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  capacidad: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  vacantes_disponibles: number;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  grado_id: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  periodo_id: string;
}