import { Module } from '@nestjs/common';
import { NotasController } from './notas.controller';
import { NotasService } from './notas.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Notas, NotasSchema } from './schema/notas.schema';
import { Estudiante, EstudianteSchema } from 'src/estudiante/schema/estudiante.schema';
import { Seccion, SeccionSchema } from 'src/seccion/schema/seccion.schema';
import { Grado, GradoSchema } from 'src/grado/schema/grado.schema';
import { PeriodoEscolar, PeriodoEscolarSchema } from 'src/periodo-escolar/schema/periodo-escolar.schema';
import { Curso, CursoSchema } from 'src/curso/schema/curso.schema';
import { Docente, DocenteSchema } from 'src/docente/schema/docente.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Notas.name, schema: NotasSchema},
      {name: Estudiante.name, schema: EstudianteSchema},
      {name: Docente.name, schema: DocenteSchema},
      {name: Seccion.name, schema: SeccionSchema},
      {name: Grado.name, schema: GradoSchema},
      {name: PeriodoEscolar.name, schema: PeriodoEscolarSchema},
      {name: Curso.name, schema: CursoSchema},
    ])
  ],
  controllers: [NotasController],
  providers: [NotasService]
})
export class NotasModule {}
