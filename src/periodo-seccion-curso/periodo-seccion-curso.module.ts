import { Module } from '@nestjs/common';
import { PeriodoSeccionCursoController } from './periodo-seccion-curso.controller';
import { PeriodoSeccionCursoService } from './periodo-seccion-curso.service';
import { PeriodoSeccionCurso, PeriodoSeccionCursoSchema } from './schema/periodo.schema';
import { Curso, CursoSchema } from 'src/curso/schema/curso.schema';
import { PeriodoEscolar, PeriodoEscolarSchema } from 'src/periodo-escolar/schema/periodo-escolar.schema';
import { Seccion, SeccionSchema } from 'src/seccion/schema/seccion.schema';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PeriodoSeccionCurso.name, schema: PeriodoSeccionCursoSchema },
      { name: PeriodoEscolar.name, schema: PeriodoEscolarSchema },
      { name: Seccion.name, schema: SeccionSchema },
      { name: Curso.name, schema: CursoSchema }
    ])
  ],

  controllers: [PeriodoSeccionCursoController],
  providers: [PeriodoSeccionCursoService]
})

export class PeriodoSeccionCursoModule {
}
