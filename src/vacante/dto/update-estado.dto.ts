import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { EstadoVacante } from '../enum/estado-vacante.enum';

export class UpdateEstadoVacanteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(EstadoVacante)
  estado: EstadoVacante;
}
