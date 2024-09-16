import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Docente, DocenteSchema } from 'src/docente/schema/docente.schema';
import { Estudiante, EstudianteSchema } from 'src/estudiante/schema/estudiante.schema';
import { Apoderado, ApoderadoSchema } from 'src/apoderado/schema/apoderado.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Estudiante.name, schema: EstudianteSchema },
      { name: Docente.name, schema: DocenteSchema },
      { name: Apoderado.name, schema: ApoderadoSchema }
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, MongooseModule],
})
export class UserModule {}