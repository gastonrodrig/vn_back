import { Module } from '@nestjs/common';
import { MatriculaService } from './matricula.service';
import { MatriculaController } from './matricula.controller';
import { Estudiante, EstudianteSchema } from 'src/estudiante/schema/estudiante.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PeriodoEscolar, PeriodoEscolarSchema } from 'src/periodo-escolar/schema/periodo-escolar.schema';
import { Matricula, MatriculaSchema } from './schema/matricula.schema';
import { Vacante, VacanteSchema } from 'src/vacante/schema/vacante.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Matricula.name, schema: MatriculaSchema},
      { name: Estudiante.name, schema: EstudianteSchema },
      { name: PeriodoEscolar.name, schema: PeriodoEscolarSchema },
      { name: Vacante.name, schema: VacanteSchema}
    ])
  ],
  providers: [MatriculaService],
  controllers: [MatriculaController]
})
export class MatriculaModule {}
