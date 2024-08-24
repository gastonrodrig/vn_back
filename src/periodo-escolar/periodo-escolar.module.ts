import { Module } from '@nestjs/common';
import { PeriodoEscolarService } from './periodo-escolar.service';
import { PeriodoEscolarController } from './periodo-escolar.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PeriodoEscolar, PeriodoEscolarSchema } from './schema/periodo-escolar.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: PeriodoEscolar.name,
      schema: PeriodoEscolarSchema
    }])
  ],
  providers: [PeriodoEscolarService],
  controllers: [PeriodoEscolarController]
})
export class PeriodoEscolarModule {}
