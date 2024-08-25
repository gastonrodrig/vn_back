import { Module } from '@nestjs/common';
import { SeccionGradoPeriodoService } from './seccion-grado-periodo.service';
import { SeccionGradoPeriodoController } from './seccion-grado-periodo.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { SeccionGradoPeriodo, SeccionGradoPeriodoSchema } from './schema/seccion.schema';
import { Grado, GradoSchema } from 'src/grado/schema/grado.schema';
import { PeriodoEscolar, PeriodoEscolarSchema } from 'src/periodo-escolar/schema/periodo-escolar.schema';
import { Seccion, SeccionSchema } from 'src/seccion/schema/seccion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SeccionGradoPeriodo.name, schema: SeccionGradoPeriodoSchema },
      { name: Seccion.name, schema: SeccionSchema },
      { name: Grado.name, schema: GradoSchema },
      { name: PeriodoEscolar.name, schema: PeriodoEscolarSchema }
    ])
  ],
  providers: [SeccionGradoPeriodoService],
  controllers: [SeccionGradoPeriodoController]
})
export class SeccionGradoPeriodoModule {}
