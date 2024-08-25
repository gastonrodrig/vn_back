import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreatePeriodoEscolarDto {
    @ApiProperty({ example: '2024' })
    @IsString()
    @IsNotEmpty()
    anio: string;
  
    @ApiProperty({ example: '2024-03-18' })
    @IsDateString()
    @IsNotEmpty()
    fechaInicio: string;
  
    @ApiProperty({ example: '2024-12-15' })
    @IsDateString()
    @IsNotEmpty()
    fechaFin: string;
}
