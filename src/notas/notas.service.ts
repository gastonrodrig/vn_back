import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notas } from './schema/notas.schema';
import mongoose, { Model, Types } from 'mongoose';
import { Estudiante } from 'src/estudiante/schema/estudiante.schema';
import { Seccion } from 'src/seccion/schema/seccion.schema';
import { Grado } from 'src/grado/schema/grado.schema';
import { PeriodoEscolar } from 'src/periodo-escolar/schema/periodo-escolar.schema';
import { Curso } from 'src/curso/schema/curso.schema';
import { CreateNotasDto } from './dto/create-notas.dto';
import { UpdateNotasDto } from './dto/update-notas.dto';
import { Docente } from 'src/docente/schema/docente.schema';

@Injectable()
export class NotasService {
  constructor(
    @InjectModel(Notas.name)
    private readonly notasModel: Model<Notas>,
    @InjectModel(Estudiante.name)
    private readonly estudianteModel: Model<Estudiante>,
    @InjectModel(Docente.name)
    private readonly docenteModel: Model<Docente>,
    @InjectModel(Seccion.name)
    private readonly seccionModel: Model<Seccion>,
    @InjectModel(Grado.name)
    private readonly gradoModel: Model<Grado>,
    @InjectModel(PeriodoEscolar.name)
    private readonly periodoModel: Model<PeriodoEscolar>,
    @InjectModel(Curso.name)
    private readonly cursoModel: Model<Curso>,
  ) {}

  async create(createNotasDto: CreateNotasDto){
    const estudiante = await this.estudianteModel.findById(createNotasDto.estudiante_id)
    if(!estudiante){
      throw new BadRequestException('Estudiante no encontrado');
    }
    const docente = await this.docenteModel.findById(createNotasDto.docente_id)
    if(!docente){
      throw new BadRequestException('Docente no encontrado')
    }
    const seccion = await this.seccionModel.findById(createNotasDto.seccion_id)
    if(!seccion){
      throw new BadRequestException('Seccion no encontrada')
    }
    const grado = await this.gradoModel.findById(createNotasDto.grado_id)
    if(!grado){
      throw new BadRequestException('Grado no encontrado')
    }
    const periodo = await this.periodoModel.findById(createNotasDto.periodo_id)
    if(!periodo){
      throw new BadRequestException('Periodo no encontrado')
    }
    const curso = await this.cursoModel.findById(createNotasDto.curso_id);
    if (!curso) {
      throw new BadRequestException('Curso no encontrado');
    }

    const notas = new this.notasModel({
      estudiante,
      docente,
      seccion,
      grado,
      periodo,
      curso,
      nota: createNotasDto.nota
    })

    await notas.save()
    return this.notasModel.findById(notas._id)
      .populate(['estudiante','docente','seccion','grado','periodo','curso'])
  }

    async findAll() {
      return await this.notasModel.find()
        .populate(['estudiante','docente','seccion','grado','periodo','curso'])
    }

    async findOne(notas_id: string){
      return await this.notasModel.findById(notas_id)
        .populate(['estudiante','docente','seccion','grado','periodo','curso'])
    }

    async update(notas_id: string, updateNotasDto: UpdateNotasDto){
        const notas = await this.notasModel.findById(notas_id)
        if(!notas){
            throw new BadRequestException('Notas no encontrada')
        }
        const estudianteId = new Types.ObjectId(updateNotasDto.estudiante_id)
        const docenteId = new Types.ObjectId(updateNotasDto.docente_id)
        const seccionId = new Types.ObjectId(updateNotasDto.seccion_id)
        const gradoId = new Types.ObjectId(updateNotasDto.grado_id)
        const periodoId = new Types.ObjectId(updateNotasDto.periodo_id)
        const cursoId = new Types.ObjectId(updateNotasDto.curso_id)

        const estudiante = await this.estudianteModel.findById(estudianteId)
        if(!estudiante){
            throw new BadRequestException('Estudiante no encontrado')
        }

        const docente = await this.docenteModel.findById(docenteId)
        if(!docente){
            throw new BadRequestException('Docente no encontrado')
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
        
        const curso = await this.cursoModel.findById(cursoId)
        if(!curso){
            throw new BadRequestException('Curso no encontrado')
        }

        notas.estudiante = estudianteId
        notas.docente = docenteId
        notas.seccion = seccionId
        notas.grado = gradoId
        notas.periodo = periodoId
        notas.curso = cursoId
        notas.nota = updateNotasDto.nota

        await notas.save()
        return this.notasModel.findById(notas_id)
          .populate(['estudiante','docente','seccion','grado','periodo','curso'])
    }

    async remove(notas_id: string){
        const notas = await this.notasModel.findById(notas_id)
        if(!notas){
            throw new BadRequestException('Notas no encontrada')
        }
        await this.notasModel.findByIdAndDelete(notas_id)
        return { sucess: true}
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

        return await this.notasModel
        .find({ grado: gradoObjectId, periodo: periodoObjectId, seccion: seccionObjectId})
          .populate(['estudiante','docente','seccion','grado','periodo','curso'])
    }
}
