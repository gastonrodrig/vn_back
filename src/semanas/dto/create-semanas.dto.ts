import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateSemanasDto {
    @ApiProperty({ example: 'semana 1' })
    @IsString()
    @IsNotEmpty()
    nombre: string;
  
  
}
