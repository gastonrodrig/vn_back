import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsNumber, IsNotEmpty, IsMongoId } from "class-validator";

export class CreateResumenAsistenciaDto {
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    semana_id: string;

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    seccion_id: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fecha: string;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    presentes: number;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    faltas: number;
    
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    justificadas: number;
}