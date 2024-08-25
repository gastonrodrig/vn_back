import { Module } from '@nestjs/common';
import { EstudianteController } from './estudiante.controller';
import { EstudianteService } from './estudiante.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Documento, DocumentoSchema } from 'src/documento/schema/documento.schema';
import { PeriodoEscolar, PeriodoEscolarSchema } from 'src/periodo-escolar/schema/periodo-escolar.schema';
import { Grado, GradoSchema } from 'src/grado/schema/grado.schema';
import { Seccion, SeccionSchema } from 'src/seccion/schema/seccion.schema';
import { Multimedia, MultimediaSchema } from 'src/multimedia/schema/multimedia.schema';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { Estudiante, EstudianteSchema } from './schema/estudiante.schema';
import { FirebaseService } from 'src/storage/firebase.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Estudiante.name, schema: EstudianteSchema },
      { name: Documento.name, schema: DocumentoSchema },
      { name: PeriodoEscolar.name, schema: PeriodoEscolarSchema },
      { name: Grado.name, schema: GradoSchema },
      { name: Seccion.name, schema: SeccionSchema },
      { name: Multimedia.name, schema: MultimediaSchema },
      { name: User.name, schema: UserSchema }
    ])
  ],
  controllers: [EstudianteController],
  providers: [EstudianteService, FirebaseService]
})
export class EstudianteModule {}
