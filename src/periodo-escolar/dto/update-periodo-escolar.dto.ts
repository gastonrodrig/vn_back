import { PartialType } from '@nestjs/swagger';
import { CreatePeriodoEscolarDto } from './create-periodo-escolar.dto';

export class UpdatePeriodoEscolarDto extends PartialType(CreatePeriodoEscolarDto) {}
