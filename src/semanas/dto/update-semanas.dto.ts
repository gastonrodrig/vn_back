import { PartialType } from '@nestjs/swagger';
import { CreateSemanasDto } from './create-semanas.dto';

export class UpdateSemanasDto extends PartialType(CreateSemanasDto) {}
