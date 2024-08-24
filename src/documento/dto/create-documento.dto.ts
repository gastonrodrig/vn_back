import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDocumentoDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: string;
}
