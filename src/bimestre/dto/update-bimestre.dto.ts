import { PartialType } from '@nestjs/swagger';
import { CreateBimestreDto } from './create-bimestre.dto';

export class UpdateBimestreDto extends PartialType(CreateBimestreDto) {}
