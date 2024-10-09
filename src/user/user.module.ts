import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { Estudiante, EstudianteSchema } from 'src/estudiante/schema/estudiante.schema';
import { Tutor, TutorSchema } from 'src/tutor/schema/tutor.schema';
import { Docente, DocenteSchema } from 'src/docente/schema/docente.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Estudiante.name, schema: EstudianteSchema },
      { name: Tutor.name, schema: TutorSchema },
      { name: Docente.name, schema: DocenteSchema }
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, MongooseModule],
})
export class UserModule {}
