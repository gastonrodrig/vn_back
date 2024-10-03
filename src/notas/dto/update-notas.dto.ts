import { PartialType } from '@nestjs/swagger';
import { CreateNotasDto } from './create-notas.dto';

export class UpdateNotasDto extends PartialType(CreateNotasDto) {}