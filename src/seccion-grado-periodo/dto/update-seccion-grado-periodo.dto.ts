import { PartialType } from '@nestjs/swagger';
import { CreateSeccionGradoPeriodoDto } from './create-seccion-grado-periodo.dto';

export class UpdateSeccionGradoPeriodoDto extends PartialType(CreateSeccionGradoPeriodoDto) {}
