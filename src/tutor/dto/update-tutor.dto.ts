import { PartialType } from '@nestjs/swagger';
import { CreateTutorDto } from './create-tutor.dto';

export class UpdateTutorDto extends PartialType(CreateTutorDto) {}