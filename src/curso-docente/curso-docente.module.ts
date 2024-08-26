import { Module } from '@nestjs/common';
import { CursoDocenteController } from './curso-docente.controller';
import { CursoDocenteService } from './curso-docente.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CursoDocente, CursoDocenteSchema } from './schema/curso-docente.schema';
import { Curso, CursoSchema } from 'src/curso/schema/curso.schema';
import { Docente, DocenteSchema } from 'src/docente/schema/docente.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CursoDocente.name, schema: CursoDocenteSchema},
      { name: Curso.name, schema: CursoSchema },
      { name: Docente.name, schema: DocenteSchema },
    ])
  ],
  controllers: [CursoDocenteController],
  providers: [CursoDocenteService]
})
export class CursoDocenteModule {}
