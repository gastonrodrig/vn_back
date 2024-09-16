import { Module } from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { SolicitudController } from './solicitud.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Solicitud, SolicitudSchema } from './schema/solicitud.schema';
import { Grado, GradoSchema } from 'src/grado/schema/grado.schema';
import { GmailTemporalService } from 'src/gmailTemporal/gmailTemporal.service';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';


@Module({
    //LISTO
  imports: [
    MongooseModule.forFeature([
      { name: Solicitud.name, schema: SolicitudSchema },
      { name: Grado.name, schema: GradoSchema },  
    ]),
    UserModule
  ],
  controllers: [SolicitudController],
  providers: [SolicitudService, GmailTemporalService, UserService],
})
export class SolicitudModule {}
