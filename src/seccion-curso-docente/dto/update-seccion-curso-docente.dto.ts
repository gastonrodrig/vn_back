import { PartialType } from '@nestjs/swagger';
import { CreateSeccionCursoDocenteDto } from './create-seccion-curso-docente.dto';

export class UpdateSeccionCursoDocenteDto extends PartialType(CreateSeccionCursoDocenteDto) {}