import { Module } from '@nestjs/common';
import { CuposService } from './cupos.service';
import { CuposController } from './cupos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cupos, CuposSchema } from './schema/cupos.schema';
import { Grado, GradoSchema } from 'src/grado/schema/grado.schema';
import { PeriodoEscolar, PeriodoEscolarSchema } from 'src/periodo-escolar/schema/periodo-escolar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Cupos.name, schema: CuposSchema},
      { name: Grado.name, schema: GradoSchema },
      { name: PeriodoEscolar.name, schema: PeriodoEscolarSchema },
    ])
  ],
  providers: [CuposService],
  controllers: [CuposController]
})
export class CuposModule {}
