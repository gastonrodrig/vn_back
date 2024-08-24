import { PartialType } from '@nestjs/swagger';
import { CreateDocumentoDto } from './create-documento.dto';

export class UpdateDocumentoDto extends PartialType(CreateDocumentoDto) {}
