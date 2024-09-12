import { Module } from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { SolicitudController } from './solicitud.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Solicitud, SolicitudSchema } from './schema/solicitud.schema';
import { Grado, GradoSchema } from 'src/grado/schema/grado.schema';


@Module({
    //LISTO
  imports: [
    MongooseModule.forFeature([
      { name: Solicitud.name, schema: SolicitudSchema },
      { name: Grado.name, schema: GradoSchema },  
    ])
  ],
  controllers: [SolicitudController],
  providers: [SolicitudService],
})
export class SolicitudModule {}
