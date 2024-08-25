import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateGradoDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nombre: string;
}
