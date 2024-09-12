import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { EstadoSolicitud } from '../enums/estado-solicitud.enum';

export class UpdateEstadoSolicitudDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(EstadoSolicitud)
  estado: EstadoSolicitud;
  
   
}
