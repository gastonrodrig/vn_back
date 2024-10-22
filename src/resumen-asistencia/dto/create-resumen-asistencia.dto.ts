import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsNumber, IsNotEmpty, IsMongoId } from "class-validator";

export class CreateResumenAsistenciaDto {
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    semana_id: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    dia: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    descripcion: string;
    
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