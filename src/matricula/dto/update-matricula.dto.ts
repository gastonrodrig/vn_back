import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class UpdateMatriculaDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  monto: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  metodo_pago: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  n_operacion: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  periodo_id: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  estudiante_id: string;
}
