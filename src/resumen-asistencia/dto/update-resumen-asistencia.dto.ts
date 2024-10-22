import { PartialType } from '@nestjs/swagger';
import { CreateResumenAsistenciaDto } from './create-resumen-asistencia.dto';

export class UpdateResumenAsistenciaDto extends PartialType(CreateResumenAsistenciaDto) {}