import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EstudianteCursoPeriodo } from './schema/estudiante-curso-periodo.schema';
import { Model, Types } from 'mongoose';
import { Estudiante } from 'src/estudiante/schema/estudiante.schema';
import { Curso } from 'src/curso/schema/curso.schema';
import { CreateEstudianteCursoPeriodoDto } from './dto/create-estudiante-curso-periodo.dto';
import { PeriodoEscolar } from 'src/periodo-escolar/schema/periodo-escolar.schema';

@Injectable()
export class EstudianteCursoPeriodoService {
  constructor(
    @InjectModel(EstudianteCursoPeriodo.name)
    private readonly estudianteCursoPeriodoModel: Model<EstudianteCursoPeriodo>,
    @InjectModel(Estudiante.name)
    private readonly estudianteModel: Model<Estudiante>,
    @InjectModel(Curso.name)
    private readonly cursoModel: Model<Curso>,
    @InjectModel(PeriodoEscolar.name)
    private readonly periodoModel: Model<PeriodoEscolar>,
  ) {}

  async create(createEstudianteCursoPeriodoDto: CreateEstudianteCursoPeriodoDto){
    const estudiante = await this.estudianteModel.findById(createEstudianteCursoPeriodoDto.estudiante_id)
    if(!estudiante){
      throw new BadRequestException('Estudiante no encontrado');
    }

    const curso = await this.cursoModel.findById(createEstudianteCursoPeriodoDto.curso_id)
    if(!curso){
      throw new BadRequestException('Curso no encontrado');
    }

    const periodo = await this.periodoModel.findById(createEstudianteCursoPeriodoDto.periodo_id)
    if(!periodo){
      throw new BadRequestException('Periodo no encontrado');
    }

    const estudiantecp = new this.estudianteCursoPeriodoModel({
      estudiante,
      curso,
      periodo
    });

    await estudiantecp.save()

    return this.estudianteCursoPeriodoModel.findById(estudiantecp._id)
      .populate(['estudiante', 'curso', 'periodo'])
  }

  async findAll(){
    return await this.estudianteCursoPeriodoModel.find()
      .populate(['estudiante', 'curso', 'periodo'])
  }

  async findOne(estudiantecp_id: string){
    return await this.estudianteCursoPeriodoModel.findById(estudiantecp_id)
      .populate(['estudiante', 'curso', 'periodo'])
  }

  async remove(estudiantecp_id: string) {
    const estudiantecp = await this.estudianteCursoPeriodoModel.findById(estudiantecp_id)
    if(!estudiantecp){
      throw new BadRequestException('EstudianteCursoPeriodo no encontrado')
    }

    await this.estudianteCursoPeriodoModel.findByIdAndDelete(estudiantecp_id)

    return { sucess: true }
  }

  async listarCursosPorEstudianteCursoPeriodo(estudiante_id: string, periodo_id: string){
    const estudianteId = new Types.ObjectId(estudiante_id)
    const estudiante = await this.estudianteModel.findById(estudianteId)
    if(!estudiante){
      throw new BadRequestException('Estudiante no encontrado')
    }

    const periodoId = new Types.ObjectId(periodo_id)
    const periodo = await this.periodoModel.findById(periodoId)
    if(!periodo){
      throw new BadRequestException('Periodo no encontrado')
    }

    return this.estudianteCursoPeriodoModel.find({ estudiante: estudiante._id, periodo: periodo._id})
      .populate(['estudiante', 'curso', 'periodo'])
  }

  async listarPeriodosPorEstudiante(estudiante_id: string) {
    const estudiante = await this.estudianteModel.findById(estudiante_id);
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado');
    }
 
    const registros = await this.estudianteCursoPeriodoModel
      .find({ estudiante: estudiante._id }).select('periodo').populate('periodo', '_id anio'); 

    const periodosUnicos = [...new Set(registros.map((registro) => registro.periodo._id.toString()))];
    return periodosUnicos;
  }
}
