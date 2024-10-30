import { Module } from '@nestjs/common';
import { AsistenciaController } from './asistencia.controller';
import { AsistenciaService } from './asistencia.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Asistencia, AsistenciaSchema } from './schema/asistencia.schema';
import { Estudiante, EstudianteSchema } from 'src/estudiante/schema/estudiante.schema';
import { Seccion, SeccionSchema } from 'src/seccion/schema/seccion.schema';
import { Grado, GradoSchema } from 'src/grado/schema/grado.schema';
import { PeriodoEscolar, PeriodoEscolarSchema } from 'src/periodo-escolar/schema/periodo-escolar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Asistencia.name, schema: AsistenciaSchema},
      {name: Estudiante.name, schema: EstudianteSchema},
      {name: Seccion.name, schema: SeccionSchema},
      {name: Grado.name, schema: GradoSchema},
      {name: PeriodoEscolar.name, schema: PeriodoEscolarSchema}
     
    ])
  ],
  controllers: [AsistenciaController],
  providers: [AsistenciaService]
})
export class AsistenciaModule {}
