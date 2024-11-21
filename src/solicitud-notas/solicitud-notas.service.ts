import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Docente } from 'src/docente/schema/docente.schema';
import { SolicitudNotas } from './schema/solicitudNotas.schema';
import { Estudiante } from 'src/estudiante/schema/estudiante.schema';
import { Curso } from 'src/curso/schema/curso.schema';
import { Bimestre } from 'src/bimestre/schema/bimestre.schema';
import { CreateSolicitudNotasDto } from './dto/create-solicitud-notas.dto';
import { UpdateSolicitudNotasDto } from './dto/update-solicitud-notas.dto';
import { EstadoSolicitudNotas } from './enums/estado-solicitudNotas.enum';
import { Seccion } from 'src/seccion/schema/seccion.schema';

@Injectable()
export class SolicitudNotasService {
    constructor(
        @InjectModel(SolicitudNotas.name)
        private readonly solicitudNotasModel: Model<SolicitudNotas>,
        @InjectModel(Docente.name)
        private readonly docenteModel: Model<Docente>,
        @InjectModel(Estudiante.name)
        private readonly estudianteModel: Model<Estudiante>,
        @InjectModel(Curso.name)
        private readonly cursoModel: Model<Curso>,
        @InjectModel(Seccion.name)
        private readonly sccionModel: Model<Seccion>,
        @InjectModel(Bimestre.name)
        private readonly bimestreModel: Model<Bimestre>,
    ) {}

    async create(createSolicitudNotasDto: CreateSolicitudNotasDto){
        const docente = await this.docenteModel.findById(createSolicitudNotasDto.docente_id)
        if(!docente){
          throw new BadRequestException('Docente no encontrado')
        }
        const estudiante = await this.estudianteModel.findById(createSolicitudNotasDto.estudiante_id)
        if(!estudiante){
            throw new BadRequestException('Estudiante no encontrado');
        }
        const curso = await this.cursoModel.findById(createSolicitudNotasDto.curso_id);
        if (!curso) {
        throw new BadRequestException('Curso no encontrado');
        }
        const seccion = await this.sccionModel.findById(createSolicitudNotasDto.seccion_id)
        if(!seccion){
            throw new BadRequestException('Seccion no encontrado');
        }
        const bimestre = await this.bimestreModel.findById(createSolicitudNotasDto.bimestre_id);
        if (!bimestre) {
          throw new BadRequestException('Bimestre no encontrado');
        }

        const solicitudExistente = await this.solicitudNotasModel.findOne({
            docente: docente._id,
            estudiante: estudiante._id,
            curso: curso._id,
            seccion: seccion._id,
            bimestre: bimestre._id,
            tipoNota: createSolicitudNotasDto.tipoNota
        });
    
        if (solicitudExistente) {
            throw new BadRequestException('Ya existe una solicitud de notas con los mismos datos.');
        }

        const solicitudNotas = new this.solicitudNotasModel({
            docente,
            descripcion: createSolicitudNotasDto.descripcion,
            estudiante,
            curso,
            seccion,
            bimestre,
            tipoNota: createSolicitudNotasDto.tipoNota
        });

        return await solicitudNotas.save();
    }

    async findAll(){
        return await this.solicitudNotasModel.find()
        .populate(['docente','estudiante','curso','seccion','bimestre'])
    }

    async findOne(solicitudn_id: string){
        return await this.solicitudNotasModel.findById(solicitudn_id)
        .populate(['docente','estudiante','curso','seccion','bimestre'])
    }

    async update(solicitudn_id: string, updateSolicitudNotasDto: UpdateSolicitudNotasDto){
        const solicitudn = await this.solicitudNotasModel.findById(solicitudn_id)
        if(!solicitudn){
            throw new BadRequestException('SolicitudNota no encontrada')
        }
        const docenteId = new Types.ObjectId(updateSolicitudNotasDto.docente_id)
        const estudianteId = new Types.ObjectId(updateSolicitudNotasDto.estudiante_id)
        const cursoId = new Types.ObjectId(updateSolicitudNotasDto.curso_id)
        const seccionId = new Types.ObjectId(updateSolicitudNotasDto.seccion_id)
        const bimestreId = new Types.ObjectId(updateSolicitudNotasDto.bimestre_id)
        
        const docente = await this.docenteModel.findById(docenteId)
        if(!docente){
          throw new BadRequestException('Docente no encontrado')
        }
        const estudiante = await this.estudianteModel.findById(estudianteId)
        if(!estudiante){
            throw new BadRequestException('Estudiante no encontrado');
        }
        const curso = await this.cursoModel.findById(cursoId);
        if (!curso) {
        throw new BadRequestException('Curso no encontrado');
        }
        const seccion = await this.sccionModel.findById(seccionId)
        if(!seccion){
            throw new BadRequestException('Seccion no encontrado'); 
        }
        const bimestre = await this.bimestreModel.findById(bimestreId);
        if (!bimestre) {
          throw new BadRequestException('Bimestre no encontrado');
        }

        solicitudn.docente = docenteId
        solicitudn.descripcion = updateSolicitudNotasDto.descripcion
        solicitudn.estudiante = estudianteId
        solicitudn.curso = cursoId
        solicitudn.seccion = seccionId
        solicitudn.bimestre = bimestreId
        solicitudn.tipoNota = updateSolicitudNotasDto.tipoNota

        return await solicitudn.save()
    }

    async aprobarSolicitudNotas(solicitudn_id: string){
        const solicitudn = await this.solicitudNotasModel.findById(solicitudn_id)
        if(!solicitudn){
            throw new BadRequestException('Solicitud no encontrada')
        }

        solicitudn.estado = EstadoSolicitudNotas.APROBADO

        return await solicitudn.save()
    }

    async rechazarSolicitud(solicitudn_id: string){
        const solicitudn = await this.solicitudNotasModel.findById(solicitudn_id)
        if(!solicitudn){
            throw new BadRequestException('Solicitud no encontrada')
        }

        solicitudn.estado = EstadoSolicitudNotas.RECHAZADO

        return await solicitudn.save()
    }
}
