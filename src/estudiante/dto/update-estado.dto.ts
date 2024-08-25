import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EstadoEstudiante } from '../enums/estado-estudiante.enum';

export class UpdateEstadoEstudianteDto {
  @ApiProperty()
  @IsEnum(EstadoEstudiante)
  @IsNotEmpty()
  estado: EstadoEstudiante;
}