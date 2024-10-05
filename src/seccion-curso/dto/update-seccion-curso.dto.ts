import { PartialType } from '@nestjs/swagger';
import { CreateSeccionCursoDto } from './create-seccion-curso.dto';

export class UpdateSeccionCursoDto extends PartialType(CreateSeccionCursoDto) {}
