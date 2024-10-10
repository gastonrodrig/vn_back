import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsNumber, IsNotEmpty, IsMongoId } from "class-validator";

export class CreatePensionDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  estudiante_id: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  monto: number;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  periodo_id: string;
  
  @ApiProperty({ example: '2024-12-15' })
  @IsString()
  @IsNotEmpty()
  fecha_inicio: Date;

  @ApiProperty({ example: '2024-03-18' })
  @IsString()
  @IsNotEmpty()
  fecha_limite: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mes: string;
}