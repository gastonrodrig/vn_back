import { PartialType } from '@nestjs/swagger';
import { CreateDocenteDto } from './create-docente.dto';

export class UpdateDocenteDto extends PartialType(CreateDocenteDto) {}
