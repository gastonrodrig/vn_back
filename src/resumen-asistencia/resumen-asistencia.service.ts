import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ResumenAsistencia } from './schema/resumen-asistencia.schema';
import { Model, Types } from 'mongoose';
import { Semanas } from 'src/semanas/schema/semanas.schema';
import { CreateResumenAsistenciaDto } from './dto/create-resumen-asistencia.dto';
import { UpdateResumenAsistenciaDto } from './dto/update-resumen-asistencia.dto';
import { Seccion } from 'src/seccion/schema/seccion.schema';

@Injectable()
export class ResumenAsistenciaService {
    constructor(
        @InjectModel(ResumenAsistencia.name)
        private readonly resumenAsistenciaModel: Model<ResumenAsistencia>,
        @InjectModel(Semanas.name)
        private readonly semanasModel: Model<Semanas>,
        @InjectModel(Seccion.name)
        private readonly seccionModel: Model<Seccion>
    ) {}

    async create(createResumenAsistenciaDto: CreateResumenAsistenciaDto){
        const semana = await this.semanasModel.findById(createResumenAsistenciaDto.semana_id)
        if(!semana){
            throw new BadRequestException('Semana no encontrada');
        }

        const seccion = await this.seccionModel.findById(createResumenAsistenciaDto.seccion_id)
        if(!seccion){
            throw new BadRequestException('Seccion no encontrada');
        }

        const seccionId = new Types.ObjectId(createResumenAsistenciaDto.seccion_id)

        const verificarSeccion = await this.resumenAsistenciaModel.findOne({
            seccion: seccionId
        })

        if(verificarSeccion){
            throw new BadRequestException('Ya existe un resumen de asistencia para esta seccion')
        }

        const resumenAsistencia = new this.resumenAsistenciaModel({
            semana,
            seccion,
            dia: createResumenAsistenciaDto.dia,
            descripcion: createResumenAsistenciaDto.descripcion,
            presentes: createResumenAsistenciaDto.presentes,
            faltas: createResumenAsistenciaDto.faltas,
            justificadas: createResumenAsistenciaDto.justificadas
        })

        await resumenAsistencia.save()
        
        return this.resumenAsistenciaModel.findById(resumenAsistencia._id)
            .populate(['semana','seccion'])
    }

    async findAll(){
        return await this.resumenAsistenciaModel.find()
            .populate(['semana','seccion'])
    }

    async findOne(resumena_id: string){
        return await this.resumenAsistenciaModel.findById(resumena_id)
            .populate(['semana','seccion'])
    }

    async update(resumena_id: string, updateResumenAsistenciaDto: UpdateResumenAsistenciaDto){
        const resumenAsistencia = await this.resumenAsistenciaModel.findById(resumena_id)
        if(!resumenAsistencia){
            throw new BadRequestException('Resumen de asistencia no encontrado')
        }

        const semanaId = new Types.ObjectId(updateResumenAsistenciaDto.semana_id)
        const seccionId = new Types.ObjectId(updateResumenAsistenciaDto.seccion_id)

        const semana = await this.resumenAsistenciaModel.findById(semanaId)
        if(!semana){
            throw new BadRequestException('Semana no encontrada')
        }

        const seccion = await this.resumenAsistenciaModel.findById(seccionId)
        if(!seccion){
            throw new BadRequestException('Seccion no encontrada')
        }

        resumenAsistencia.semana = semanaId
        resumenAsistencia.seccion = seccionId
        resumenAsistencia.dia = updateResumenAsistenciaDto.dia
        resumenAsistencia.descripcion = updateResumenAsistenciaDto.descripcion
        resumenAsistencia.presentes = updateResumenAsistenciaDto.presentes
        resumenAsistencia.faltas = updateResumenAsistenciaDto.faltas
        resumenAsistencia.justificadas = updateResumenAsistenciaDto.justificadas
        
        await resumenAsistencia.save()

        return this.resumenAsistenciaModel.findById(resumenAsistencia._id)
            .populate(['semana','seccion'])
    }

    async remove(resumena_id: string){
        const resumenAsistencia = await this.resumenAsistenciaModel.findById(resumena_id)
        if(!resumenAsistencia){
            throw new BadRequestException('Resumen de asistencia no encontrado')
        }

        await this.resumenAsistenciaModel.findByIdAndDelete(resumena_id)

        return { success: true}
    }

    async listarResumenAsistenciaPorSeccion(seccion_id: string){
        const seccion = await this.seccionModel.findById(seccion_id)
        if(!seccion){
            throw new BadRequestException('Seccion no encontrada')
        }
        const seccionId = new Types.ObjectId(seccion_id)
        return await this.resumenAsistenciaModel.find({
            seccion: seccionId
        })
        .populate(['semana','seccion'])
    }
}
