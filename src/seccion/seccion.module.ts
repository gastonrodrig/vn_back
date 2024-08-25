import { Module } from '@nestjs/common';
import { SeccionController } from './seccion.controller';
import { SeccionService } from './seccion.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Seccion, SeccionSchema } from './schema/seccion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Seccion.name, schema: SeccionSchema}
    ])
  ],
  controllers: [SeccionController],
  providers: [SeccionService]
})
export class SeccionModule {}
