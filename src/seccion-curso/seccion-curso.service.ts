import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Seccion } from 'src/seccion/schema/seccion.schema';
import { SeccionCurso } from './schema/seccionCurso.schema';
import { Curso } from 'src/curso/schema/curso.schema';
import { CreateSeccionCursoDto } from './dto/create-seccion-curso.dto';
import { UpdateSeccionCursoDto } from './dto/update-seccion-curso.dto';

@Injectable()
export class SeccionCursoService {
    constructor(
        @InjectModel(SeccionCurso.name)
        private seccionCursoModel: Model<SeccionCurso>,
        @InjectModel(Seccion.name)
        private seccionModel: Model<Seccion>,
        @InjectModel(Curso.name)
        private cursoModel: Model<Curso>
      ) {}
    
      async create(createSeccionCursoDto: CreateSeccionCursoDto) {
        
        const seccion = await this.seccionModel.findById(createSeccionCursoDto.seccion_id)
        if (!seccion) {
          throw new BadRequestException('Sección no encontrada')
        }
    
        const curso = await this.cursoModel.findById(createSeccionCursoDto.curso_id)
        if (!curso) {
          throw new BadRequestException('Curso no encontrado')
        }
    
        const seccionCurso = new this.seccionCursoModel({
            seccion,
            curso
        })
    
        await seccionCurso.save()
    
        return this.seccionCursoModel.findById(seccionCurso._id)
          .populate([,'seccion', 'curso' ])
      }
    
      async findAll() {
        return await this.seccionCursoModel.find()
        .populate([,'seccion', 'curso'])
      }
    
      async findOne(seccionc_id: string) {
        return await this.seccionCursoModel.findById(seccionc_id)
        .populate([,'seccion', 'curso'])
      }
    
      async update(seccionc_id: string, updateSeccionCursoDto: UpdateSeccionCursoDto) {
        const seccionCurso = await this.seccionCursoModel.findById(seccionc_id)
        if (!seccionCurso) {
          throw new BadRequestException('SeccionCurso no encontrado')
        }
    
        const seccionId = new Types.ObjectId(updateSeccionCursoDto.seccion_id)
        const cursoId = new Types.ObjectId(updateSeccionCursoDto.curso_id)

        const seccion = await this.seccionModel.findById(seccionId)
        if (!seccion) {
          throw new BadRequestException('Sección no encontrada')
        }
        const curso = await this.cursoModel.findById(cursoId)
        if (!curso) {
          throw new BadRequestException('Curso no encontrado')
        }
    
        seccionCurso.seccion = seccionId
        seccionCurso.curso = cursoId
    
        await seccionCurso.save()
    
        return this.seccionCursoModel.findById(seccionCurso._id)
          .populate([, 'seccion', 'curso'])
      }
    
      async remove(seccionc_id: string) {
        const seccionCurso = await this.seccionCursoModel.findById(seccionc_id)
        if (!seccionCurso) {
          throw new BadRequestException('SeccionCurso no encontrado')
        }
        await this.seccionCursoModel.findByIdAndDelete(seccionc_id)
  
        return { success: true }
      }
  
}
