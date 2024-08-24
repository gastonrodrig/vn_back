import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString } from "class-validator";

export class CreatePeriodoEscolarDto {
    @ApiProperty({ example: '2024' })
    @IsString()
    anio: string;
  
    @ApiProperty({ example: '2024-03-18' })
    @IsDateString()
    fechaInicio: string;
  
    @ApiProperty({ example: '2024-12-15' })
    @IsDateString()
    fechaFin: string;
}
