import { Module } from '@nestjs/common';
import { VacanteController } from './vacante.controller';
import { VacanteService } from './vacante.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Vacante, VacanteSchema } from './schema/vacante.schema';
import { Estudiante, EstudianteSchema } from 'src/estudiante/schema/estudiante.schema';
import { Grado, GradoSchema } from 'src/grado/schema/grado.schema';
import { PeriodoEscolar, PeriodoEscolarSchema } from 'src/periodo-escolar/schema/periodo-escolar.schema';
import { Cupos } from 'src/cupos/schema/cupos.schema';
import { CuposModule } from 'src/cupos/cupos.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vacante.name, schema: VacanteSchema},
      { name: Estudiante.name, schema: EstudianteSchema },
      { name: Grado.name, schema: GradoSchema },
      { name: PeriodoEscolar.name, schema: PeriodoEscolarSchema },
    ]),
    CuposModule
  ],
  providers: [VacanteService],
  controllers: [VacanteController]
})
export class VacanteModule {}
