import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { TipoSolicitudNota } from "../enums/tipo-solicitudNota.enum";

export class CreateSolicitudNotasDto {
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    docente_id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    estudiante_id: string;

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    curso_id: string;

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    seccion_id: string;

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    bimestre_id: string;

    @ApiProperty()
    @IsEnum(TipoSolicitudNota)
    @IsNotEmpty()
    tipoNota: TipoSolicitudNota;
}