import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Estudiante } from 'src/estudiante/schema/estudiante.schema';
import { Multimedia } from 'src/multimedia/schema/multimedia.schema';
import { FirebaseService } from 'src/storage/firebase.service';
import { DocumentosEstudiante } from './schema/documentos-estudiante.schema';
import { CreateDocumentosEstudianteDto } from './dto/create-documentos-estudiante.dto';

@Injectable()
export class DocumentosEstudianteService {
  constructor(
    @InjectModel(DocumentosEstudiante.name)
    private readonly documentosEstudianteModel: Model<DocumentosEstudiante>,
    @InjectModel(Estudiante.name)
    private readonly estudianteModel: Model<Estudiante>,
    @InjectModel(Multimedia.name)
    private readonly multimediaModel: Model<Multimedia>,
    private readonly firebaseService: FirebaseService
  ) {}

  async create(createDocumentosEstudianteDto: CreateDocumentosEstudianteDto, multimediaFiles: Express.Multer.File[]) {
    const estudiante = await this.estudianteModel.findById(createDocumentosEstudianteDto.estudiante_id)
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado')
    }

    const uploadedMultimedia = await this.firebaseService.uploadDocumentsToFirebase(
      'Estudiante',
      multimediaFiles,
    );

    const multimediaEntries = await Promise.all(
      uploadedMultimedia.map(async (media) => {
        const createdMultimedia = new this.multimediaModel(media);
        return createdMultimedia.save();
      }),
    );

    const documentosEstudiante = new this.documentosEstudianteModel({
      estudiante: estudiante._id,
      multimedia: multimediaEntries.map((m) => m._id),
    });

    await documentosEstudiante.save()

    return this.documentosEstudianteModel.findById(documentosEstudiante._id)
      .populate('estudiante')
      .populate({ path: 'multimedia', model: 'Multimedia' })
  }

  async findAll() {
    return await this.documentosEstudianteModel.find()
      .populate('estudiante')
      .populate({ path: 'multimedia', model: 'Multimedia' })
  }

  async findOne(documento_e_id: string) {
    return await this.documentosEstudianteModel.findById(documento_e_id)
      .populate('estudiante')
      .populate({ path: 'multimedia', model: 'Multimedia' })
  }

  async update(estudiante_id: string, files: Express.Multer.File[]) {
    const estudiante = await this.estudianteModel.findById(estudiante_id)
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado');
    }

    const documentosEstudiante = await this.documentosEstudianteModel.findById({ estudiante: { _id: estudiante_id } })
      .populate('multimedia')
    if (!documentosEstudiante) {
      throw new BadRequestException('Documentos del estudiante no encontrados')
    }

    if (documentosEstudiante.multimedia && documentosEstudiante.multimedia.length > 0) {
      for (const multimedia of documentosEstudiante.multimedia) {
        const multimediaDoc = multimedia as unknown as Multimedia;
        if (multimediaDoc.url) {
          await this.firebaseService.deleteFileFromFirebase(multimediaDoc.url);
          await this.multimediaModel.findByIdAndDelete(multimediaDoc._id).exec();
        }
      }
      documentosEstudiante.multimedia = [];
    }

    const uploadedMultimedia = await this.firebaseService.uploadDocumentsToFirebase('Estudiante', files);

    const multimediaEntries = await Promise.all(
      uploadedMultimedia.map(async (media) => {
        const createdMultimedia = new this.multimediaModel(media);
        return createdMultimedia.save();
      }),
    );

    documentosEstudiante.multimedia = multimediaEntries.map((m) => m._id);

    await documentosEstudiante.save()

    return this.documentosEstudianteModel.findById(documentosEstudiante._id)
      .populate('estudiante')
      .populate({ path: 'multimedia', model: 'Multimedia' })
  }

  async remove(estudiante_id: string) {
    const documentosEstudiante = await this.documentosEstudianteModel.findById({ estudiante: { _id: estudiante_id } })
      .populate('multimedia')
    if (!documentosEstudiante) {
      throw new BadRequestException('Documentos del estudiante no encontrados');
    }

    if (documentosEstudiante.multimedia && documentosEstudiante.multimedia.length > 0) {
      for (const multimedia of documentosEstudiante.multimedia) {
        await this.multimediaModel.findByIdAndDelete(multimedia._id)
      }
    }

    await this.documentosEstudianteModel.findByIdAndDelete(documentosEstudiante._id)

    return { success: true };
  }

  async listarDocumentosPorEstudiante(estudiante_id: string) {
    const estudiante = await this.estudianteModel.findById(estudiante_id).exec();
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado');
    }
  
    // Busca los documentos del estudiante y usa populate para obtener los detalles de multimedia
    const documentosEstudiante = await this.documentosEstudianteModel.find({ estudiante: { _id: estudiante_id } })
      .populate({ path: 'multimedia', model: 'Multimedia' })
      .exec();
  
    return documentosEstudiante;
  }
}
