import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Rol, RolSchema } from './schema/rol.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Rol.name, schema: RolSchema }
    ])
  ],
  providers: [RolService],
  controllers: [RolController]
})
export class RolModule {}
