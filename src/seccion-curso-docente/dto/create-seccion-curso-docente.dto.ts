import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";

export class CreateSeccionCursoDocenteDto {
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    seccion_id: string;

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    curso_id: string;

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    docente_id: string;
}