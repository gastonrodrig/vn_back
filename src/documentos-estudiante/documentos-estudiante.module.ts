import { Module } from '@nestjs/common';
import { DocumentosEstudianteController } from './documentos-estudiante.controller';
import { DocumentosEstudianteService } from './documentos-estudiante.service';
import { FirebaseService } from 'src/storage/firebase.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentosEstudiante, DocumentosEstudianteSchema } from './schema/documentos-estudiante.schema';
import { Multimedia, MultimediaSchema } from 'src/multimedia/schema/multimedia.schema';
import { Estudiante, EstudianteSchema } from 'src/estudiante/schema/estudiante.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DocumentosEstudiante.name, schema: DocumentosEstudianteSchema },
      { name: Estudiante.name, schema: EstudianteSchema },
      { name: Multimedia.name, schema: MultimediaSchema }
    ])
  ],
  providers: [DocumentosEstudianteService, FirebaseService],
  controllers: [DocumentosEstudianteController]
})
export class DocumentosEstudianteModule {}