import { Module } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { HorarioController } from './horario.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Curso, CursoSchema } from 'src/curso/schema/curso.schema';
import { Docente, DocenteSchema } from 'src/docente/schema/docente.schema';
import { Grado, GradoSchema } from 'src/grado/schema/grado.schema';
import { Seccion, SeccionSchema } from 'src/seccion/schema/seccion.schema';
import { Horario, HorarioSchema } from './schema/horario.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Horario.name, schema: HorarioSchema },
      { name: Seccion.name, schema: SeccionSchema },
      { name: Grado.name, schema: GradoSchema },
      { name: Curso.name, schema: CursoSchema },
      { name: Docente.name, schema: DocenteSchema }
    ])
  ],
  providers: [HorarioService],
  controllers: [HorarioController]
})
export class HorarioModule {}