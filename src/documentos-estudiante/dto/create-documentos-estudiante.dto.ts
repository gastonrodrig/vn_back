import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateDocumentosEstudianteDto {
    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    estudiante_id: string;
}
