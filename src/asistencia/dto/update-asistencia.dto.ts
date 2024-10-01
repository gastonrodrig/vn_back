import { PartialType } from '@nestjs/swagger';
import { CreateAsistenciaDto } from './create-asistencia.dto';

export class UpdateAsistenciaDto extends PartialType(CreateAsistenciaDto) {}