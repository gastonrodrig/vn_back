import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SeccionCursoDocente } from './schema/seccionCursoDocente.schema';
import { Model, Types } from 'mongoose';
import { Seccion } from 'src/seccion/schema/seccion.schema';
import { Curso } from 'src/curso/schema/curso.schema';
import { Docente } from 'src/docente/schema/docente.schema';
import { CreateSeccionCursoDocenteDto } from './dto/create-seccion-curso-docente.dto';
import { UpdateSeccionCursoDocenteDto } from './dto/update-seccion-curso-docente.dto';

@Injectable()
export class SeccionCursoDocenteService {
    constructor(
        @InjectModel(SeccionCursoDocente.name)
        private readonly seccionCursoDocenteModel: Model<SeccionCursoDocente>,
        @InjectModel(Seccion.name)
        private readonly seccionModel: Model<Seccion>,
        @InjectModel(Curso.name)
        private readonly cursoModel: Model<Curso>,
        @InjectModel(Docente.name)
        private readonly docenteModel: Model<Docente>
    ) {}

    async create(createSeccionCursoDocenteDto: CreateSeccionCursoDocenteDto){
        const seccion = await this.seccionModel.findById(createSeccionCursoDocenteDto.seccion_id)
        if (!seccion) {
            throw new BadRequestException('Sección no encontrada')
        }

        const curso = await this.cursoModel.findById(createSeccionCursoDocenteDto.curso_id)
        if (!curso) {
            throw new BadRequestException('Curso no encontrado')
        }

        const docente = await this.docenteModel.findById(createSeccionCursoDocenteDto.docente_id)
        if (!docente) {
            throw new BadRequestException('Docente no encontrado')
        }

        const seccionId = new Types.ObjectId(createSeccionCursoDocenteDto.seccion_id);
        const cursoId = new Types.ObjectId(createSeccionCursoDocenteDto.curso_id);
        const docenteId = new Types.ObjectId(createSeccionCursoDocenteDto.docente_id);
        
        
        const verificarSeccionCursoDocente = await this.seccionCursoDocenteModel.findOne({
            seccion: seccionId,
            curso: cursoId,
            docente: docenteId
        });

        if(verificarSeccionCursoDocente){
            throw new BadRequestException('Ya existe un registro con la misma sección, curso y docente')
        }

        const seccionCursoDocente = new this.seccionCursoDocenteModel({
            seccion,
            curso,
            docente
        })

        await seccionCursoDocente.save()

        return this.seccionCursoDocenteModel.findById(seccionCursoDocente._id)
            .populate(['seccion', 'curso', 'docente'])
    }

    async findAll(){
        return await this.seccionCursoDocenteModel.find()
        .populate(['seccion', 'curso', 'docente'])
    }

    async findOne(seccioncd_id: string){
        return await this.seccionCursoDocenteModel.findById(seccioncd_id)
        .populate(['seccion', 'curso', 'docente'])
    }

    async update(seccioncd_id: string, updateSeccionCursoDocenteDto: UpdateSeccionCursoDocenteDto){
        const seccionCursoDocente = await this.seccionCursoDocenteModel.findById(seccioncd_id)
        if (!seccionCursoDocente) {
            throw new BadRequestException('SeccionCursoDocente no encontrado')
        }

        const seccionId = new Types.ObjectId(updateSeccionCursoDocenteDto.seccion_id)
        const cursoId = new Types.ObjectId(updateSeccionCursoDocenteDto.curso_id)
        const docenteId = new Types.ObjectId(updateSeccionCursoDocenteDto.docente_id)

        const seccion = await this.seccionModel.findById(seccionId)
        if (!seccion) {
            throw new BadRequestException('Sección no encontrada')
        }
        const curso = await this.cursoModel.findById(cursoId)
        if (!curso) {
            throw new BadRequestException('Curso no encontrado')
        }
        const docente = await this.docenteModel.findById(docenteId)
        if (!docente) {
            throw new BadRequestException('Docente no encontrado')
        }

        seccionCursoDocente.seccion = seccionId
        seccionCursoDocente.curso = cursoId
        seccionCursoDocente.docente = docenteId

        await seccionCursoDocente.save()

        return this.seccionCursoDocenteModel.findById(seccionCursoDocente._id)
            .populate(['seccion', 'curso', 'docente'])
    }

    async remove(seccioncd_id: string){
        const seccionCursoDocente = await this.seccionCursoDocenteModel.findById(seccioncd_id)
        if (!seccionCursoDocente) {
            throw new BadRequestException('SeccionCursoDocente no encontrado')
        }

        await this.seccionCursoDocenteModel.findByIdAndDelete(seccioncd_id)

        return { success: true}
    }

    async obtenerSeccionCursoDocente(seccion_id: string, curso_id: string, docente_id: string) {
        const seccionId = new Types.ObjectId(seccion_id)
        const cursoId = new Types.ObjectId(curso_id)
        const docenteId = new Types.ObjectId(docente_id)

        const seccion = await this.seccionModel.findById(seccionId);
        if (!seccion) {
            throw new BadRequestException('Sección no encontrada');
        }
    
        const curso = await this.cursoModel.findById(cursoId);
        if (!curso) {
            throw new BadRequestException('Curso no encontrado');
        }
    
        const docente = await this.docenteModel.findById(docenteId);
        if (!docente) {
            throw new BadRequestException('Docente no encontrado');
        }
    
        const seccionCursoDocente = await this.seccionCursoDocenteModel.findOne({
            seccion: seccionId,
            curso: cursoId,
            docente: docenteId
        }).populate(['seccion', 'curso', 'docente']);
    
        if (!seccionCursoDocente) {
            throw new BadRequestException('No se encontró un registro con la sección, curso y docente proporcionados');
        }
    
        return seccionCursoDocente;
    }

    async obtenerSeccionesPorDocente(docente_id: string) {
        const docenteId = new Types.ObjectId(docente_id);

        const docente = await this.docenteModel.findById(docenteId);
        if (!docente) {
            throw new BadRequestException('Docente no encontrado');
        }

        const seccionesCursosDocente = await this.seccionCursoDocenteModel.find({
            docente: docenteId
        }).populate(['seccion', 'curso', 'docente']);

        if (!seccionesCursosDocente.length) {
            throw new BadRequestException('No se encontraron registros para el docente proporcionado');
        }

        return seccionesCursosDocente;
    }
}
