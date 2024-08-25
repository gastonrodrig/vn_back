import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Estudiante } from './schema/estudiante.schema';
import { Model, Types } from 'mongoose';
import { Documento } from 'src/documento/schema/documento.schema';
import { PeriodoEscolar } from 'src/periodo-escolar/schema/periodo-escolar.schema';
import { Grado } from 'src/grado/schema/grado.schema';
import { Seccion } from 'src/seccion/schema/seccion.schema';
import { Multimedia } from 'src/multimedia/schema/multimedia.schema';
import { FirebaseService } from 'src/storage/firebase.service';
import { User } from 'src/user/schema/user.schema';
import { UpdateEstadoEstudianteDto } from './dto/update-estado.dto';
import { UpdateSeccionDto } from './dto/update-seccion.dto';

@Injectable()
export class EstudianteService {
  constructor (
     @InjectModel(Estudiante.name) 
     private readonly estudianteModel: Model<Estudiante>,
     @InjectModel(Documento.name)
     private readonly documentoModel: Model<Documento>,
     @InjectModel(PeriodoEscolar.name)
     private readonly periodoEscolarModel: Model<PeriodoEscolar>,
     @InjectModel(Grado.name)
     private readonly gradoModel: Model<Grado>,
     @InjectModel(Seccion.name)
     private readonly seccionModel: Model<Seccion>,
     @InjectModel(Multimedia.name)
     private readonly multimediaModel: Model<Multimedia>,
     private readonly firebaseService: FirebaseService,
     @InjectModel(User.name)
     private readonly userModel: Model<User>
  ) {}

  async create(createEstudianteDto: CreateEstudianteDto){
    const documento = await this.documentoModel.findById(createEstudianteDto.documento_id)
    if(!documento){
      throw new BadRequestException('Documento no encontrado');
    }

    const periodo = await this.periodoEscolarModel.findById(createEstudianteDto.periodo_id)
    if(!periodo){
      throw new BadRequestException('Periodo no encontrado')
    }

    const grado = await this.gradoModel.findById(createEstudianteDto.grado_id)
    if(!grado){
      throw new BadRequestException('Grado no encontrado')
    }

    let seccion = null
    if (createEstudianteDto.seccion_id) {
      seccion = await this.seccionModel.findById(createEstudianteDto.seccion_id)
      if (!seccion) {
        throw new BadRequestException('Sección no encontrada');
      }   
    }
    
    const estudiante = new this.estudianteModel({
      nombre: createEstudianteDto.nombre,
      apellido: createEstudianteDto.apellido,
      direccion: createEstudianteDto.direccion,
      numero_documento: createEstudianteDto.numero_documento,
      documento,
      periodo,
      grado,
      seccion: seccion ? seccion._id : null,
    })

    await estudiante.save()

    return this.estudianteModel.findById(estudiante._id)
      .populate(['documento','periodo','grado','seccion','multimedia','user'])
  }

  async findAll() {
    return await this.estudianteModel.find()
      .populate(['documento','periodo','grado','seccion','multimedia','user'])
  }

  async findOne(estudiante_id: string){
    return await this.estudianteModel.findById(estudiante_id)
      .populate(['documento','periodo','grado','seccion','multimedia','user'])
  }

  async update(estudiante_id: string, updateEstudianteDto: UpdateEstudianteDto){
    const estudiante = await this.estudianteModel.findById(estudiante_id)
    if(!estudiante){
      throw new BadRequestException('Estudiante no encontrado')
    }

    const documentoId = new Types.ObjectId(updateEstudianteDto.documento_id)
    const documento = await this.documentoModel.findById(documentoId)
    if(!documento){
      throw new BadRequestException('Documento no encontrado')
    }

    const periodoId = new Types.ObjectId(updateEstudianteDto.periodo_id)
    const periodo = await this.periodoEscolarModel.findById(periodoId)
    if(!periodo){
      throw new BadRequestException('Periodo no encontrado')
    }
    
    const gradoId = new Types.ObjectId(updateEstudianteDto.grado_id)
    const grado = await this.gradoModel.findById(gradoId)
    if(!grado){
      throw new BadRequestException('Grado no encontrado')
    }

    let seccion = estudiante.seccion;
    if (updateEstudianteDto.seccion_id) {
      if (this.assignSeccion) {
        seccion = await this.seccionModel.findById(updateEstudianteDto.seccion_id)
        if (!seccion) {
          throw new BadRequestException('Sección no encontrada');
        }
      }
    } else if (updateEstudianteDto.grado_id && updateEstudianteDto.periodo_id) {
      seccion = null;
    }

    estudiante.nombre = updateEstudianteDto.nombre
    estudiante.apellido = updateEstudianteDto.apellido
    estudiante.direccion = updateEstudianteDto.direccion
    estudiante.numero_documento = updateEstudianteDto.numero_documento
    estudiante.documento = documentoId
    estudiante.periodo = periodoId
    estudiante.grado = gradoId
    estudiante.seccion = seccion ? seccion._id : null

    await estudiante.save()

    return this.estudianteModel.findById(estudiante._id)
      .populate(['documento','periodo','grado','seccion','multimedia','user'])
  }  
  
  async assignSeccion(estudiante_id: string, updateSeccionDto: UpdateSeccionDto) {
    const estudiante = await this.estudianteModel.findById(estudiante_id)
    if (!estudiante){
      throw new BadRequestException('Estudiante no encontrado');
    }

    const seccionId = new Types.ObjectId(updateSeccionDto.seccion_id)
    const seccion = await this.seccionModel.findById(seccionId)
    if(!seccion){
      throw new BadRequestException('Seccion no encontrada')
    }

    estudiante.seccion = seccion._id

    await estudiante.save()

    return this.estudianteModel.findById(estudiante._id)
      .populate(['documento','periodo','grado','seccion','multimedia','user'])
  }

  async removeSeccion(estudianteId: string) {
    const estudiante = await this.estudianteModel.findById(estudianteId)
      .populate('seccion')
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado');
    }

    estudiante.seccion = null

    await estudiante.save()

    return this.estudianteModel.findById(estudiante._id)
      .populate(['documento','periodo','grado','seccion','multimedia','user'])
  }

  async remove(estudiante_id: string){
    const estudiante = await this.estudianteModel.findById(estudiante_id)
      .populate('user')
    if(!estudiante){
      throw new BadRequestException('Estudiante no encontrado')
    }
    await this.estudianteModel.findByIdAndDelete(estudiante_id)

    if(estudiante.user) {
      const user = estudiante.user._id
      await this.userModel.findByIdAndDelete(user)
    }

    return { sucess: true }
  }

  async listarPorGradoYPeriodo(grado_id: string, periodo_id: string) {
    const grado = await this.gradoModel.findById(grado_id)
    if (!grado) {
      throw new BadRequestException('Grado no encontrado');
    }

    const periodo = await this.periodoEscolarModel.findById(periodo_id)
    if (!periodo) {
      throw new BadRequestException('Periodo no encontrado');
    }

    const estudiantes = await this.estudianteModel.find({ grado: grado._id, periodo: periodo._id })
      .populate(['documento','periodo','grado','seccion','multimedia','user'])

    return estudiantes.filter(estudiante => estudiante.seccion === null)
  }

  async listarPorSeccionGradoYPeriodo(seccion_id: string, grado_id: string, periodo_id: string) {
    const seccion = await this.seccionModel.findById(seccion_id)
    if (!seccion) {
      throw new BadRequestException('Sección no encontrada');
    }

    const grado = await this.gradoModel.findById(grado_id)
    if (!grado) {
      throw new BadRequestException('Grado no encontrado');
    }

    const periodo = await this.periodoEscolarModel.findById(periodo_id)
    if (!periodo) {
      throw new BadRequestException('Periodo no encontrado');
    }

    return this.estudianteModel.find({
      seccion: seccion._id,
      grado: grado._id,
      periodo: periodo._id,
    }).populate(['documento','periodo','grado','seccion','multimedia','user'])
  }

  async asignarUsuario(estudiante_id: string, usuario_id: string){
    const estudiante = await this.estudianteModel.findById(estudiante_id)
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado');
    }

    const usuario = await this.userModel.findById(usuario_id).exec();
    if (!usuario) {
      throw new BadRequestException('Usuario no encontrado');
    }

    estudiante.user = usuario._id

    await estudiante.save()

    return this.estudianteModel.findById(estudiante._id)
      .populate(['documento','periodo','grado','seccion','multimedia','user'])
  }

  async removeUsuario(estudiante_id: string) {
    const estudiante = await this.estudianteModel.findById(estudiante_id)
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado')
    }
  
    estudiante.user = null;
  
    await estudiante.save()

    return this.estudianteModel.findById(estudiante._id)
      .populate(['documento','periodo','grado','seccion','multimedia','user'])
  }

  async updateProfilePicture(estudiante_id: string, file: Express.Multer.File) {
    const estudiante = await this.estudianteModel.findById(estudiante_id)
      .populate('multimedia')
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado')
    }
  
    if (estudiante.multimedia && (estudiante.multimedia as unknown as Multimedia).url) {
      const multimedia = estudiante.multimedia as unknown as Multimedia;
      await this.firebaseService.deleteFileFromFirebase(multimedia.url);
      await this.multimediaModel.deleteOne({ _id: multimedia._id }).exec();
      estudiante.multimedia = null;
    }

    const imageUrl = await this.firebaseService.uploadPfpToFirebase('Estudiante', file);

    const multimedia = new this.multimediaModel({
      url: imageUrl,
      nombre: file.originalname,
      tamanio: file.size,
    });

    await multimedia.save()

    estudiante.multimedia = multimedia

    await estudiante.save()

    return this.estudianteModel.findById(estudiante._id)
      .populate(['documento','periodo','grado','seccion','multimedia','user'])
  }

  async getProfilePicture(estudiante_id: string) {
    const estudiante = await this.estudianteModel.findById(estudiante_id)
      .populate('multimedia')
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado')
    }

    if (!estudiante.multimedia) {
      return { url: 'no existe' };
    }
    
    return this.estudianteModel.findById(estudiante._id)
    .populate(['documento','periodo','grado','seccion','multimedia','user'])
  }

  async updateEstado(estudiante_id: string, updateEstadoEstudianteDto: UpdateEstadoEstudianteDto) {
    const estudiante = await this.estudianteModel.findById(estudiante_id)
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado')
    }

    estudiante.estado = updateEstadoEstudianteDto.estado;
  
    await estudiante.save()

    return this.estudianteModel.findById(estudiante._id)
      .populate(['documento','periodo','grado','seccion','multimedia','user'])
  }
}