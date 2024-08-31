import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EstudianteCurso } from './schema/estudiante-curso.schema';
import { Model, Types } from 'mongoose';
import { Estudiante } from 'src/estudiante/schema/estudiante.schema';
import { Curso } from 'src/curso/schema/curso.schema';
import { CreateEstudianteCursoDto } from './dto/create-estudiante-curso.dto';
import { UpdateEstudianteCursoDto } from './dto/update-estudiante-curso.dto';

@Injectable()
export class EstudianteCursoService {
  constructor(
    @InjectModel(EstudianteCurso.name)
    private readonly estudianteCursoModel: Model<EstudianteCurso>,
    @InjectModel(Estudiante.name)
    private readonly estudianteModel: Model<Estudiante>,
    @InjectModel(Curso.name)
    private readonly cursoModel: Model<Curso>,
  ) {}

  async create(createEstudianteCursoDto: CreateEstudianteCursoDto){
    const estudiante = await this.estudianteModel.findById(createEstudianteCursoDto.estudiante_id)
    if(!estudiante){
      throw new BadRequestException('Documento no encontrado');
    }

    const curso = await this.cursoModel.findById(createEstudianteCursoDto.curso_id)
    if(!curso){
      throw new BadRequestException('Curso no encontrado');
    }

    const estudiantec = new this.estudianteCursoModel({
      estudiante,
      curso
    });

    await estudiantec.save()

    return this.estudianteCursoModel.findById(estudiantec._id)
      .populate(['estudiante','curso'])
  }

  async findAll(){
    return await this.estudianteCursoModel.find()
      .populate(['estudiante','curso'])
  }

  async findOne(estudiantec_id: string){
    return await this.estudianteCursoModel.findById(estudiantec_id)
      .populate(['estudiante','curso'])
  }

  async update(estudiantec_id: string, updateEstudianteCursoDto: UpdateEstudianteCursoDto){
    const estudiantec = await this.estudianteCursoModel.findById(estudiantec_id)
    if(!estudiantec){
      throw new BadRequestException('EstudianteCurso no encontrado')
    }
    
    const estudianteId = new Types.ObjectId(updateEstudianteCursoDto.estudiante_id)
    const estudiante = await this.estudianteModel.findById(estudianteId)
    if(!estudiante){
        throw new BadRequestException('Estudiante no encontrado')
    }
    
    const cursoId = new Types.ObjectId(updateEstudianteCursoDto.curso_id)
    const curso = await this.cursoModel.findById(cursoId)
    if(!curso){
        throw new BadRequestException('Curso no encontrado')
    }
    
    estudiantec.estudiante = estudianteId,
    estudiantec.curso = cursoId

    await estudiantec.save()

    return this.estudianteCursoModel.findById(estudiantec_id)
      .populate(['estudiante','curso'])
  }

  async remove(estudiantec_id: string) {
    const estudiantec = await this.estudianteCursoModel.findById(estudiantec_id)
      .populate(['estudiante','curso'])
    if(!estudiantec){
      throw new BadRequestException('EstudianteCurso no encontrado')
    }

    await this.estudianteCursoModel.findByIdAndDelete(estudiantec_id)

    return { sucess: true }
  }

  async listarCursosPorEstudiante(estudiante_id: string){
    const estudianteId = new Types.ObjectId(estudiante_id)
    const estudiante = await this.estudianteModel.findById(estudianteId)
    if(!estudiante){
      throw new BadRequestException('Estudiante no encontrado')
    }

    return this.estudianteCursoModel.find({ estudiante: estudiante._id })
    .populate(['estudiante','curso'])
  }
}
