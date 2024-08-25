import { PartialType } from '@nestjs/swagger';
import { CreateSeccionDto } from './create-seccion.dto';

export class UpdateSeccionDto extends PartialType(CreateSeccionDto) {}
