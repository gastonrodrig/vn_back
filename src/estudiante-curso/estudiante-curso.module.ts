import { Module } from '@nestjs/common';
import { EstudianteCursoController } from './estudiante-curso.controller';
import { EstudianteCursoService } from './estudiante-curso.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Curso, CursoSchema } from 'src/curso/schema/curso.schema';
import { Estudiante, EstudianteSchema } from 'src/estudiante/schema/estudiante.schema';
import { EstudianteCurso, EstudianteCursoSchema } from './schema/estudiante-curso.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: EstudianteCurso.name, schema: EstudianteCursoSchema},
      { name: Estudiante.name, schema: EstudianteSchema },
      { name: Curso.name, schema: CursoSchema },
    ])
  ],
  controllers: [EstudianteCursoController],
  providers: [EstudianteCursoService]
})
export class EstudianteCursoModule {}
