import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { EstadoSolicitudNotas } from '../enums/estado-solicitudNotas.enum';

export class UpdateEstadoSolicitudNotasDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(EstadoSolicitudNotas)
    estado: EstadoSolicitudNotas; 
}