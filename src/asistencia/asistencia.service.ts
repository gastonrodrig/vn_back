import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Asistencia } from './schema/asistencia.schema';
import mongoose, { Model, Types } from 'mongoose';
import { Estudiante } from 'src/estudiante/schema/estudiante.schema';
import { Tutor } from 'src/tutor/schema/tutor.schema';
import { Seccion } from 'src/seccion/schema/seccion.schema';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { EstadoAsistencia } from './enums/estado-asistencia.enum';
import { Grado } from 'src/grado/schema/grado.schema';
import { PeriodoEscolar } from 'src/periodo-escolar/schema/periodo-escolar.schema';

@Injectable()
export class AsistenciaService {
    constructor(
        @InjectModel(Asistencia.name)
        private readonly asistenciaModel: Model<Asistencia>,
        @InjectModel(Estudiante.name)
        private readonly estudianteModel: Model<Estudiante>,
        @InjectModel(Tutor.name)
        private readonly tutorModel: Model<Tutor>,
        @InjectModel(Seccion.name)
        private readonly seccionModel: Model<Seccion>,
        @InjectModel(Grado.name)
        private readonly gradoModel: Model<Grado>,
        @InjectModel(PeriodoEscolar.name)
        private readonly periodoModel: Model<PeriodoEscolar>,
    ) {}

    async create(createAsistenciaDto: CreateAsistenciaDto){
        const estudiante = await this.estudianteModel.findById(createAsistenciaDto.estudiante_id)
        if(!estudiante){
            throw new BadRequestException('Estudiante no encontrado');
        }
        const tutor = await this.tutorModel.findById(createAsistenciaDto.tutor_id)
        if(!tutor){
            throw new BadRequestException('Tutor no encontrado')
        }
        const seccion = await this.seccionModel.findById(createAsistenciaDto.seccion_id)
        if(!seccion){
            throw new BadRequestException('Seccion no encontrada')
        }
        const grado = await this.gradoModel.findById(createAsistenciaDto.grado_id)
        if(!grado){
            throw new BadRequestException('Grado no encontrado')
        }
        const periodo = await this.periodoModel.findById(createAsistenciaDto.periodo_id)
        if(!periodo){
            throw new BadRequestException('Periodo no encontrado')
        }

        const asistencia = new this.asistenciaModel({
            estudiante,
            tutor,
            seccion,
            grado,
            periodo
        });
        return await asistencia.save();
    }

    async findAll(){
        return await this.asistenciaModel.find()
        .populate(['estudiante','tutor','seccion','grado','periodo'])
    }

    async findOne(asistencia_id: string){
        return await this.asistenciaModel.findById(asistencia_id)
        .populate(['estudiante','tutor','seccion','grado','periodo'])
    }

    async update(asistencia_id: string, updateAsistenciaDto: UpdateAsistenciaDto){
        const asistencia = await this.asistenciaModel.findById(asistencia_id)
        if(!asistencia){
            throw new BadRequestException('Asistencia no encontrada')
        }
        const estudianteId = new Types.ObjectId(updateAsistenciaDto.estudiante_id)
        const tutorId = new Types.ObjectId(updateAsistenciaDto.tutor_id)
        const seccionId = new Types.ObjectId(updateAsistenciaDto.seccion_id)
        const gradoId = new Types.ObjectId(updateAsistenciaDto.grado_id)
        const periodoId = new Types.ObjectId(updateAsistenciaDto.periodo_id)

        const estudiante = await this.estudianteModel.findById(estudianteId)
        if(!estudiante){
            throw new BadRequestException('Estudiante no encontrado')
        }

        const tutor = await this.tutorModel.findById(tutorId)
        if(!tutor){
            throw new BadRequestException('Tutor no encontrado')
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

        asistencia.estudiante = estudianteId
        asistencia.tutor = tutorId
        asistencia.seccion = tutorId
        asistencia.grado = gradoId
        asistencia.periodo = periodoId

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
}
