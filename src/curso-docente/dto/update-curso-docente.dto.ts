import { PartialType } from '@nestjs/swagger';
import { CreateCursoDocenteDto } from './create-curso-docente.dto';

export class UpdateCursoDocenteDto extends PartialType(CreateCursoDocenteDto) {}