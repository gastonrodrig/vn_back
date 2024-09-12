import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateEstadoSolicitudDto {
    //ESTO SE ENCARGA GASTON
   @ApiProperty()
  @IsString()
  @IsNotEmpty()
  
  readonly estado: string; // Nuevo estado de la solicitud
}
