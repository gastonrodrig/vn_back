import { PartialType } from '@nestjs/swagger';
import { CreatePeriodoSeccionCursoDto } from './create-periodo-seccion-curso.dto';

export class UpdatePeriodoSeccionCursoDto extends PartialType(CreatePeriodoSeccionCursoDto) {}
