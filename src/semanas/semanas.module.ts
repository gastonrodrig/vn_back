import { Module } from '@nestjs/common';
import { SemanasService } from './semanas.service';
import { SemanasController } from './semanas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Semanas, SemanasSchema } from './schema/semanas.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Semanas.name, schema: SemanasSchema}
    ])
  ],
  providers: [SemanasService],
  controllers: [SemanasController]
})
export class SemanasModule {}
