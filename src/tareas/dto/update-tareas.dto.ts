import { PartialType } from '@nestjs/swagger';
import { CreateTareasDto } from './create-tareas.dto';

export class UpdateTareasDto extends PartialType(CreateTareasDto) {}