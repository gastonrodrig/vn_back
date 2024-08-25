import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateGradoCursoHorasDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  horas: number;
}