import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Asistencia } from './schema/asistencia.schema';
import mongoose, { Model, Types} from 'mongoose';
import { Estudiante } from 'src/estudiante/schema/estudiante.schema';
import { Tutor } from 'src/tutor/schema/tutor.schema';
import { Seccion } from 'src/seccion/schema/seccion.schema';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { EstadoAsistencia } from './enums/estado-asistencia.enum';
import { Grado } from 'src/grado/schema/grado.schema';
import { PeriodoEscolar } from 'src/periodo-escolar/schema/periodo-escolar.schema';
import { Semanas } from 'src/semanas/schema/semanas.schema';

@Injectable()
export class AsistenciaService {
  constructor(
    @InjectModel(Asistencia.name)
    private readonly asistenciaModel: Model<Asistencia>,
    @InjectModel(Estudiante.name)
    private readonly estudianteModel: Model<Estudiante>,
    @InjectModel(Seccion.name)
    private readonly seccionModel: Model<Seccion>,
    @InjectModel(Grado.name)
    private readonly gradoModel: Model<Grado>,
    @InjectModel(PeriodoEscolar.name)
    private readonly periodoModel: Model<PeriodoEscolar>,
    @InjectModel(Semanas.name)
    private readonly semanaModel: Model<Semanas>,
  ) {}

  async create(createAsistenciaDto: CreateAsistenciaDto) {
    const estudiante = await this.estudianteModel.findById(createAsistenciaDto.estudiante_id);
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado');
    }
    const seccion = await this.seccionModel.findById(createAsistenciaDto.seccion_id);
    if (!seccion) {
      throw new BadRequestException('Seccion no encontrada');
    }
    const grado = await this.gradoModel.findById(createAsistenciaDto.grado_id);
    if (!grado) {
      throw new BadRequestException('Grado no encontrado');
    }
    const periodo = await this.periodoModel.findById(createAsistenciaDto.periodo_id);
    if (!periodo) {
      throw new BadRequestException('Periodo no encontrado');
    }
    const semana = await this.semanaModel.findById(createAsistenciaDto.semana_id);
    if (!semana) {
      throw new BadRequestException('Semana no encontrada');
    }

    const asistencia = new this.asistenciaModel({
      estudiante,
      seccion,
      grado,
      periodo,
      semana,
      fecha: createAsistenciaDto.fecha,
      mes: createAsistenciaDto.mes,
      estado: createAsistenciaDto.estado,
    });

    return await asistencia.save();
  }

  async findAll(){
    return await this.asistenciaModel.find()
      .populate(['estudiante','seccion','grado','periodo'])
  }

  async findOne(asistencia_id: string){
    return await this.asistenciaModel.findById(asistencia_id)
      .populate(['estudiante','seccion','grado','periodo'])
  }

  async update(asistencia_id: string, updateAsistenciaDto: UpdateAsistenciaDto){
    const asistencia = await this.asistenciaModel.findById(asistencia_id)
    if(!asistencia){
      throw new BadRequestException('Asistencia no encontrada')
    }

    const estudianteId = new Types.ObjectId(updateAsistenciaDto.estudiante_id)
    const seccionId = new Types.ObjectId(updateAsistenciaDto.seccion_id)
    const gradoId = new Types.ObjectId(updateAsistenciaDto.grado_id)
    const periodoId = new Types.ObjectId(updateAsistenciaDto.periodo_id)
    const semanaId = new Types.ObjectId(updateAsistenciaDto.semana_id)

    const estudiante = await this.estudianteModel.findById(estudianteId)
    if(!estudiante){
        throw new BadRequestException('Estudiante no encontrado')
    }

    const seccion = await this.seccionModel.findById(seccionId)
    if(!seccion){
        throw new BadRequestException('Seccion no encontrada')
    }

    const grado = await this.gradoModel.findById(gradoId)
    if(!grado){
        throw new BadRequestException('Grado no encontrado')
    }

    const periodo = await this.periodoModel.findById(periodoId)
    if(!periodo){
        throw new BadRequestException('Periodo no encontrado')
    }

    const semana = await this.semanaModel.findById(semanaId)
    if(!semana){
        throw new BadRequestException('Semana no encontrada')
    }

    asistencia.estudiante = estudianteId
    asistencia.seccion = seccionId
    asistencia.grado = gradoId
    asistencia.periodo = periodoId
    asistencia.semana = semanaId
    asistencia.estado = updateAsistenciaDto.estado

    await asistencia.save()

    return this.asistenciaModel.findById(asistencia._id)
      .populate(['estudiante','tutor','seccion','grado','periodo'])
  }

  async remove(asistencia_id: string){
    const asistencia = await this.asistenciaModel.findById(asistencia_id)
    if(!asistencia){
      throw new BadRequestException('Asistencia no encontrada')
    }

    await this.asistenciaModel.findByIdAndDelete(asistencia_id)

    return { sucess: true }
  }

  async changePresente(asistencia_id: string){
    const asistencia = await this.asistenciaModel.findById(asistencia_id);
    if(!asistencia){
        throw new BadRequestException('Asistencia no encontrada')
    }

    asistencia.estado = EstadoAsistencia.PRESENTE

    return await asistencia.save()
  }

  async changeJustificado(asistencia_id: string){
    const asistencia = await this.asistenciaModel.findById(asistencia_id);
    if(!asistencia){
      throw new BadRequestException('Asistencia no encontrado')
    }
    
    asistencia.estado = EstadoAsistencia.JUSTIFICADO

    return await asistencia.save()
  }

  async changeFalta(asistencia_id: string){
    const asistencia = await this.asistenciaModel.findById(asistencia_id);
    if(!asistencia){
      throw new BadRequestException('Asistencia no encontrado')
    }

    asistencia.estado = EstadoAsistencia.FALTA

    return await asistencia.save()
  }

  async listarEstudiantesPorGradoPeriodoYSeccion(gradoId: string, periodoId: string, seccionId: string){
    const gradoObjectId = new mongoose.Types.ObjectId(gradoId);
    const periodoObjectId = new mongoose.Types.ObjectId(periodoId);
    const seccionObjectId = new mongoose.Types.ObjectId(seccionId);

    const grado = await this.gradoModel.findById(gradoObjectId);
    if(!grado){
      throw new BadRequestException('Grado no encontrado')
    }
    const periodo = await this.periodoModel.findById(periodoObjectId);
    if(!periodo){
      throw new BadRequestException('Periodo no encontrado')
    }
    const seccion = await this.seccionModel.findById(seccionObjectId);
    if(!seccion){
      throw new BadRequestException('Seccion no encontrado')
    }

    return await this.asistenciaModel
      .find({ grado: gradoObjectId, periodo: periodoObjectId, seccion: seccionObjectId})
      .populate(['estudiante','grado','periodo','seccion'])
  }

  async obtenerResumenAsistencia(fecha: string, seccionId: string) {
    if (!fecha) {
        throw new BadRequestException('La fecha es requerida');
    }
    
    let seccionObjectId: mongoose.Types.ObjectId;

    try {
        seccionObjectId = new mongoose.Types.ObjectId(seccionId);
    } catch (error) {
        throw new BadRequestException('El ID de sección no es válido');
    }

    const resumenAsistencia = await this.asistenciaModel.aggregate([
      {
        $match: {
          fecha, // Filtrar por la fecha que se pasa como parámetro
          seccion: seccionObjectId, // Filtrar por la sección
        },
      },
      {
        $group: {
          _id: null, // Agrupar todos los resultados en un solo documento
          totalFaltas: {
            $sum: {
              $cond: [{ $eq: ['$estado', 'Falta'] }, 1, 0], // Contar Faltas
            },
          },
          totalJustificados: {
            $sum: {
              $cond: [{ $eq: ['$estado', 'Justificado'] }, 1, 0], // Contar Justificados
            },
          },
          totalPresentes: {
            $sum: {
              $cond: [{ $eq: ['$estado', 'Presente'] }, 1, 0], // Contar Presentes
            },
          },
        },
      },
      {
        $project: {
          _id: 0, // No mostrar el campo _id en la respuesta
          totalFaltas: 1,
          totalJustificados: 1,
          totalPresentes: 1,
          fecha: { $literal: fecha }, // Agregar la fecha a la respuesta
          seccion: { $toObjectId: seccionObjectId }, // Agregar la sección a la respuesta
        },
      },
    ]);
  
    if (resumenAsistencia.length === 0) {
      throw new BadRequestException('No se encontraron registros de asistencia para la fecha y sección especificadas');
    }

    console.log('Resumen de asistencia:', resumenAsistencia); 

    return resumenAsistencia[0];
  }

  async obtenerFechasUnicas() {
    const fechas = await this.asistenciaModel.distinct('fecha');
    return fechas;
  }
}
