import { PartialType } from '@nestjs/swagger';
import { CreateApoderadoDto } from './create-apoderado.dto';

export class UpdateApoderadoDto extends PartialType(CreateApoderadoDto) {}