import { PartialType } from '@nestjs/mapped-types';
import { CreateSolicitudNotasDto } from './create-solicitud-notas.dto';

export class UpdateSolicitudNotasDto extends PartialType(CreateSolicitudNotasDto) {}