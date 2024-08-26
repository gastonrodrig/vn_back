import { PartialType } from '@nestjs/swagger';
import { CreateEstudianteCursoDto } from './create-estudiante-curso.dto';

export class UpdateEstudianteCursoDto extends PartialType(CreateEstudianteCursoDto) {}