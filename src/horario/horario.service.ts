import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Curso } from 'src/curso/schema/curso.schema';
import { Docente } from 'src/docente/schema/docente.schema';
import { Grado } from 'src/grado/schema/grado.schema';
import { Seccion } from 'src/seccion/schema/seccion.schema';
import { Horario } from './schema/horario.schema';
import { CreateHorarioDto } from './dto/create-horario.dto';

@Injectable()
export class HorarioService {
  constructor(
    @InjectModel(Horario.name)
    private readonly horarioModel: Model<Horario>,
    @InjectModel(Seccion.name)
    private readonly seccionModel: Model<Seccion>,
    @InjectModel(Grado.name)
    private readonly gradoModel: Model<Grado>,
    @InjectModel(Curso.name)
    private readonly cursoModel: Model<Curso>,
    @InjectModel(Docente.name)
    private readonly docenteModel: Model<Docente>,
  ) {}

  async create(createHorarioDto: CreateHorarioDto) {
    const seccion = await this.seccionModel.findById(createHorarioDto.seccion_id)
    if (!seccion) {
      throw new BadRequestException('Sección no encontrada');
    }

    const grado = await this.gradoModel.findById(createHorarioDto.grado_id)
    if (!grado) {
      throw new BadRequestException('Grado no encontrado');
    }

    const curso = await this.cursoModel.findById(createHorarioDto.curso_id)
    if (!curso) {
      throw new BadRequestException('Curso no encontrado');
    }

    const docente = await this.docenteModel.findById(createHorarioDto.docente_id)
    if (!docente) {
      throw new BadRequestException('Docente no encontrado');
    }

    const conflictoHorario = await this.horarioModel.findOne({
      docente,
      dia_semana: createHorarioDto.dia_semana,
      hora_inicio: createHorarioDto.hora_inicio,
      hora_fin: createHorarioDto.hora_fin
    });

    if (conflictoHorario) {
      throw new BadRequestException('El docente ya tiene una clase asignada en el mismo horario.');
    }

    const horario = new this.horarioModel({
      dia_semana: createHorarioDto.dia_semana,
      hora_inicio: createHorarioDto.hora_inicio,
      hora_fin: createHorarioDto.hora_fin,
      seccion,
      grado,
      curso,
      docente
    });

    await horario.save();

    return this.horarioModel.findById(horario._id)
      .populate(['seccion', 'grado', 'curso', 'docente'])
  }

  async findAll() {
    return await this.horarioModel.find()
      .populate(['seccion', 'grado', 'curso', 'docente'])
  }

  async findOne(horario_id: string) {
    return await this.horarioModel.findById(horario_id)
      .populate(['seccion', 'grado', 'curso', 'docente'])
  }

  async remove(horario_id: string) {
    const horario = await this.horarioModel.findByIdAndDelete(horario_id)
    if (!horario) {
      throw new BadRequestException('Horario no encontrado')
    }

    return { success: true }
  }

  async findHorariosBySeccionAndGrado(seccion_id: string, grado_id: string) {
    // Convertir los IDs en ObjectId
    const seccionObjectId = new Types.ObjectId(seccion_id);
    const gradoObjectId = new Types.ObjectId(grado_id);
  
    // Buscar la sección por su ObjectId
    const seccion = await this.seccionModel.findById(seccionObjectId);
    if (!seccion) {
      throw new BadRequestException('Sección no encontrada');
    }
  
    const grado = await this.gradoModel.findById(gradoObjectId);
    if (!grado) {
      throw new BadRequestException('Grado no encontrado');
    }
  
    const horarios = await this.horarioModel.find({
      seccion: seccionObjectId,
      grado: gradoObjectId,
    }).populate(['seccion', 'grado', 'curso', 'docente']);
  
    if (horarios.length === 0) {
      throw new BadRequestException('No se encontraron horarios para la sección y grado proporcionados');
    }
  
    return horarios;
  }

  async obtenerRegistroBySeccionGradoAndCurso(seccion_id: string, grado_id: string, curso_id: string) {
    const seccionObjectId = new Types.ObjectId(seccion_id);
    const gradoObjectId = new Types.ObjectId(grado_id);
    const cursoObjectId = new Types.ObjectId(curso_id);
  
    const seccion = await this.seccionModel.findById(seccionObjectId);
    if (!seccion) {
      throw new BadRequestException('Sección no encontrada');
    }
  
    const grado = await this.gradoModel.findById(gradoObjectId);
    if (!grado) {
      throw new BadRequestException('Grado no encontrado');
    }
  
    const curso = await this.cursoModel.findById(cursoObjectId);
    if (!curso) {
      throw new BadRequestException('Curso no encontrado');
    }
  
    return await this.horarioModel.countDocuments({
      seccion: seccion._id,
      grado: grado._id,
      curso: curso._id,
    });
  }

  async listerHorariosPorDocente(docente_id: string){
    const docente = await this.docenteModel.findById(docente_id)
    if(!docente){
      throw new BadRequestException('Docente no encontrado')
    }
    return this.horarioModel.find({ docente: docente._id })
    .populate(['seccion', 'grado', 'curso', 'docente'])
  }
}
