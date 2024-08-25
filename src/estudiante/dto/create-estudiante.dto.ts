import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class CreateEstudianteDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    apellido: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    direccion: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    numero_documento: string;

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    documento_id: string;

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    periodo_id: string;

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    grado_id: string;

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    seccion_id: string;

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    multimedia_id: string;
}