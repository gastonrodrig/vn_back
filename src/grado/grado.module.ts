import { Module } from '@nestjs/common';
import { GradoService } from './grado.service';
import { GradoController } from './grado.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Grado, GradoSchema } from './schema/grado.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Grado.name,
      schema: GradoSchema
    }])
  ],
  providers: [GradoService],
  controllers: [GradoController]
})
export class GradoModule {}
