import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateSeccionDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  seccion_id: string;
}