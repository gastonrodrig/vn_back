import { Module } from '@nestjs/common';
import { SolicitudNotasController } from './solicitud-notas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Docente, DocenteSchema } from 'src/docente/schema/docente.schema';
import { Estudiante, EstudianteSchema } from 'src/estudiante/schema/estudiante.schema';
import { SolicitudNotas, SolicitudNotasSchema } from './schema/solicitudNotas.schema';
import { Curso, CursoSchema } from 'src/curso/schema/curso.schema';
import { Bimestre, BimestreSchema } from 'src/bimestre/schema/bimestre.schema';
import { SolicitudNotasService } from './solicitud-notas.service';
import { Seccion, SeccionSchema } from 'src/seccion/schema/seccion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: SolicitudNotas.name, schema: SolicitudNotasSchema},
      {name: Docente.name, schema: DocenteSchema},
      {name: Estudiante.name, schema: EstudianteSchema},
      {name: Curso.name, schema: CursoSchema},
      {name: Seccion.name, schema: SeccionSchema},
      {name: Bimestre.name, schema: BimestreSchema}
    ])
  ],
  controllers: [SolicitudNotasController],
  providers: [SolicitudNotasService]
})
export class SolicitudNotasModule {}
