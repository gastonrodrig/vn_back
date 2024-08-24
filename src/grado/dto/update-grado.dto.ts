import { PartialType } from '@nestjs/swagger';
import { CreateGradoDto } from './create-grado.dto';

export class UpdateGradoDto extends PartialType(CreateGradoDto) {}
