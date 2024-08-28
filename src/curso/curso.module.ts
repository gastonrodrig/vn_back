import { Module } from '@nestjs/common';
import { CursoController } from './curso.controller';
import { CursoService } from './curso.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Curso, CursoSchema } from './schema/curso.schema';
import { GradoCursoHoras, GradoCursoHorasSchema } from 'src/grado-curso-horas/schema/grado-curso-horas.schema';
import { CursoDocente, CursoDocenteSchema } from 'src/curso-docente/schema/curso-docente.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Curso.name, schema: CursoSchema },
      { name: GradoCursoHoras.name, schema: GradoCursoHorasSchema },
      { name: CursoDocente.name, schema: CursoDocenteSchema }
    ])
  ],
  controllers: [CursoController],
  providers: [CursoService]
})
export class CursoModule {}
