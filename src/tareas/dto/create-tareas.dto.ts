import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTareasDto {
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    estudiante_id: string;
  
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    curso_id: string;
}