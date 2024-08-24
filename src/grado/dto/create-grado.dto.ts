import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGradoDto {
    @ApiProperty()
    @IsString()
    nombre: string;
}
