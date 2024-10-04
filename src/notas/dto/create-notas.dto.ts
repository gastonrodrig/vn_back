import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateNotasDto {
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    estudiante_id: string;

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    tutor_id: string;

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

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    curso_id: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    nota: number;
}