import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Seccion } from 'src/seccion/schema/seccion.schema';
import { PeriodoSeccionCurso } from './schema/periodo.schema';
import { Curso } from 'src/curso/schema/curso.schema';
import { PeriodoEscolar } from 'src/periodo-escolar/schema/periodo-escolar.schema';
import { CreatePeriodoSeccionCursoDto } from './dto/create-periodo-seccion-curso.dto';
import { UpdatePeriodoSeccionCursoDto } from './dto/update-periodo-seccion-curso.dto';

@Injectable()
export class PeriodoSeccionCursoService {
    constructor(
        @InjectModel(PeriodoSeccionCurso.name)
        private periodoSeccionCursoModel: Model<PeriodoSeccionCurso>,
        @InjectModel(PeriodoEscolar.name)
        private periodoEscolarModel: Model<PeriodoEscolar>,
        @InjectModel(Seccion.name)
        private seccionModel: Model<Seccion>,
        @InjectModel(Curso.name)
        private cursoModel: Model<Curso>
      ) {}
    
      async create(createPeriodoSeccionCursoDto: CreatePeriodoSeccionCursoDto) {
        
        const periodo = await this.periodoEscolarModel.findById(createPeriodoSeccionCursoDto.periodo_id)
        if (!periodo) {
          throw new BadRequestException('Periodo no encontrado')
        }
        
        const seccion = await this.seccionModel.findById(createPeriodoSeccionCursoDto.seccion_id)
        if (!seccion) {
          throw new BadRequestException('Sección no encontrada')
        }
    
        const curso = await this.cursoModel.findById(createPeriodoSeccionCursoDto.curso_id)
        if (!curso) {
          throw new BadRequestException('Curso no encontrado')
        }
    
        
    
        const periodoSeccionCurso = new this.periodoSeccionCursoModel({
            periodo,
            seccion,
            curso
        })
    
        await periodoSeccionCurso.save()
    
        return this.periodoSeccionCursoModel.findById(periodoSeccionCurso._id)
          .populate(['periodo','seccion', 'curso' ])
      }
    
      async findAll() {
        return await this.periodoSeccionCursoModel.find()
        .populate(['periodo','seccion', 'curso'])
      }
    
      async findOne(periodogp_id: string) {
        return await this.periodoSeccionCursoModel.findById(periodogp_id)
        .populate(['periodo','seccion', 'curso'])
      }
    
      async update(periodogp_id: string, updatePeriodoSeccionCursoDto: UpdatePeriodoSeccionCursoDto) {
        const periodoSeccionCurso = await this.periodoSeccionCursoModel.findById(periodogp_id)
        if (!periodoSeccionCurso) {
          throw new BadRequestException('PeriodoSeccionCurso no encontrado')
        }
    
        const periodoId = new Types.ObjectId(updatePeriodoSeccionCursoDto.periodo_id)
        const seccionId = new Types.ObjectId(updatePeriodoSeccionCursoDto.seccion_id)
        const cursoId = new Types.ObjectId(updatePeriodoSeccionCursoDto.curso_id)
    
        const periodo = await this.periodoEscolarModel.findById(periodoId)
        if (!periodo) {
          throw new BadRequestException('Periodo Escolar no encontrado')
        }
        const seccion = await this.seccionModel.findById(seccionId)
        if (!seccion) {
          throw new BadRequestException('Sección no encontrada')
        }
        const curso = await this.cursoModel.findById(cursoId)
        if (!curso) {
          throw new BadRequestException('Curso no encontrado')
        }
       
    
        periodoSeccionCurso.periodo = periodoId
        periodoSeccionCurso.seccion = seccionId
        periodoSeccionCurso.curso = cursoId
    
    
        await periodoSeccionCurso.save()
    
        return this.periodoEscolarModel.findById(periodoSeccionCurso._id)
          .populate(['periodo', 'secccion', 'curso'])
      }
    
      async remove(periodogp_id: string) {
        const periodoSeccionCurso = await this.periodoSeccionCursoModel.findById(periodogp_id)
          .populate('periodo')
        if (!periodoSeccionCurso) {
          throw new BadRequestException('PeriodoSeccionCurso no encontrado')
        }
        await this.periodoSeccionCursoModel.findByIdAndDelete(periodogp_id)
    
        const periodo = periodoSeccionCurso.periodo._id
        await this.periodoEscolarModel.findByIdAndDelete(periodo)
    
        return { success: true }
      }
    
      async listarCursoSeccionyPeriodo(seccionId: string, periodoId: string) {
        const seccionObjectId = new mongoose.Types.ObjectId(seccionId);
        const periodoObjectId = new mongoose.Types.ObjectId(periodoId);
    
        const periodo = await this.cursoModel.findById(periodoObjectId);
        if (!periodo) {
          throw new BadRequestException('Periodo no encontrado');
        }
    
        const seccion = await this.seccionModel.findById(seccionObjectId);
        if (!seccion) {
          throw new BadRequestException('Seccion no encontrado');
        }
    
        return await this.periodoSeccionCursoModel
          .find({ seccion: seccionObjectId, periodo: periodoObjectId })
          .populate(['curso', 'seccion', 'periodo']);
      }

}
