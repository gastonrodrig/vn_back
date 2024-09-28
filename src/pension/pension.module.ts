import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pension, PensionSchema } from './schema/pension.schema';
import { Estudiante, EstudianteSchema } from 'src/estudiante/schema/estudiante.schema';
import { PensionService } from './pension.service';
import { PensionController } from './pension.controller';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: Pension.name, schema: PensionSchema},
      {name: Estudiante.name, schema: EstudianteSchema},
    ])
  ],
  providers:[PensionService],
  controllers:[PensionController]
})
export class PensionModule {}
