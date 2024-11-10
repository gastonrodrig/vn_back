import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBimestreDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre: string;
}
