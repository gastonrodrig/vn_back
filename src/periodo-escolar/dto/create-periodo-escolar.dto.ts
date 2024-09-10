import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePeriodoEscolarDto {
    @ApiProperty({ example: '2024' })
    @IsString()
    @IsNotEmpty()
    anio: string;
  
    @ApiProperty({ example: '2024-03-18' })
    @IsString()
    @IsNotEmpty()
    fechaInicio: string;
  
    @ApiProperty({ example: '2024-12-15' })
    @IsString()
    @IsNotEmpty()
    fechaFin: string;
}
