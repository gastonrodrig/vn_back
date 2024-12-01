import { Module } from '@nestjs/common';
import { EstudianteCursoPeriodoService } from './estudiante-curso-periodo.service';
import { EstudianteCursoPeriodoController } from './estudiante-curso-periodo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Curso, CursoSchema } from 'src/curso/schema/curso.schema';
import { Estudiante, EstudianteSchema } from 'src/estudiante/schema/estudiante.schema';
import { PeriodoEscolar, PeriodoEscolarSchema } from 'src/periodo-escolar/schema/periodo-escolar.schema';
import { EstudianteCursoPeriodo, EstudianteCursoPeriodoSchema } from './schema/estudiante-curso-periodo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EstudianteCursoPeriodo.name, schema: EstudianteCursoPeriodoSchema},
      { name: Estudiante.name, schema: EstudianteSchema },
      { name: Curso.name, schema: CursoSchema },
      { name: PeriodoEscolar.name, schema: PeriodoEscolarSchema}
    ])
  ],
  providers: [EstudianteCursoPeriodoService],
  controllers: [EstudianteCursoPeriodoController]
})
export class EstudianteCursoPeriodoModule {}
