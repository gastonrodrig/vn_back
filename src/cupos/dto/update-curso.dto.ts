import { PartialType } from '@nestjs/swagger';
import { CreateCuposDto } from './create-cupos.dto';

export class UpdateCuposDto extends PartialType(CreateCuposDto) {}