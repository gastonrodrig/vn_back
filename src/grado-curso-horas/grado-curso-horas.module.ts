import { Module } from '@nestjs/common';
import { GradoCursoHorasService } from './grado-curso-horas.service';
import { GradoCursoHorasController } from './grado-curso-horas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Curso, CursoSchema } from 'src/curso/schema/curso.schema';
import { Grado, GradoSchema } from 'src/grado/schema/grado.schema';
import { GradoCursoHoras, GradoCursoHorasSchema } from './schema/grado-curso-horas.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GradoCursoHoras.name, schema: GradoCursoHorasSchema },
      { name: Grado.name, schema: GradoSchema },
      { name: Curso.name, schema: CursoSchema }
    ])
  ],
  providers: [GradoCursoHorasService],
  controllers: [GradoCursoHorasController]
})
export class GradoCursoHorasModule {}
