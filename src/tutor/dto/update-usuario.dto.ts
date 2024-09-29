import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateUsuarioDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  user_id: string;
}