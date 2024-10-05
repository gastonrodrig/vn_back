import { Module } from '@nestjs/common';
import { SeccionCursoController } from './seccion-curso.controller';
import { SeccionCursoService } from './seccion-curso.service';
import { SeccionCurso, SeccionCursoSchema } from './schema/seccionCurso.schema';
import { Curso, CursoSchema } from 'src/curso/schema/curso.schema';
import { Seccion, SeccionSchema } from 'src/seccion/schema/seccion.schema';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SeccionCurso.name, schema: SeccionCursoSchema },
      { name: Seccion.name, schema: SeccionSchema },
      { name: Curso.name, schema: CursoSchema }
    ])
  ],

  controllers: [SeccionCursoController],
  providers: [SeccionCursoService]
})

export class SeccionCursoModule {
}
