import { Module } from '@nestjs/common';
import { SeccionCursoDocenteController } from './seccion-curso-docente.controller';
import { SeccionCursoDocenteService } from './seccion-curso-docente.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SeccionCursoDocente, SeccionCursoDocenteSchema } from './schema/seccionCursoDocente.schema';
import { Curso, CursoSchema } from 'src/curso/schema/curso.schema';
import { Docente, DocenteSchema } from 'src/docente/schema/docente.schema';
import { Seccion, SeccionSchema } from 'src/seccion/schema/seccion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SeccionCursoDocente.name, schema: SeccionCursoDocenteSchema },
      { name: Seccion.name, schema: SeccionSchema },
      { name: Curso.name, schema: CursoSchema },
      { name: Docente.name, schema: DocenteSchema }
    ])
  ],
  controllers: [SeccionCursoDocenteController],
  providers: [SeccionCursoDocenteService]
})
export class SeccionCursoDocenteModule {}
