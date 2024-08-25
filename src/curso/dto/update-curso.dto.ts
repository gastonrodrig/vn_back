import { PartialType } from '@nestjs/swagger';
import { CreateCursoDto } from './create-curso.dto';

export class UpdateCursoDto extends PartialType(CreateCursoDto) {}
