import { Module } from '@nestjs/common';
import { ResumenAsistenciaController } from './resumen-asistencia.controller';
import { ResumenAsistenciaService } from './resumen-asistencia.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ResumenAsistencia, ResumenAsistenciaSchema } from './schema/resumen-asistencia.schema';
import { Semanas, SemanasSchema } from 'src/semanas/schema/semanas.schema';
import { Seccion, SeccionSchema } from 'src/seccion/schema/seccion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ResumenAsistencia.name, schema: ResumenAsistenciaSchema },
      { name: Semanas.name, schema: SemanasSchema },
      { name: Seccion.name, schema: SeccionSchema}
    ])
  ],
  controllers: [ResumenAsistenciaController],
  providers: [ResumenAsistenciaService]
})
export class ResumenAsistenciaModule {}
