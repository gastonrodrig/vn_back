import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Seccion } from 'src/seccion/schema/seccion.schema';
import { SeccionGradoPeriodo } from './schema/seccion.schema';
import { Grado } from 'src/grado/schema/grado.schema';
import { PeriodoEscolar } from 'src/periodo-escolar/schema/periodo-escolar.schema';
import { CreateSeccionGradoPeriodoDto } from './dto/create-seccion-grado-periodo.dto';
import { UpdateSeccionGradoPeriodoDto } from './dto/update-seccion-grado-periodo.dto';

@Injectable()
export class SeccionGradoPeriodoService {
  constructor(
    @InjectModel(SeccionGradoPeriodo.name)
    private seccionGradoPeriodoModel: Model<SeccionGradoPeriodo>,
    @InjectModel(Seccion.name)
    private seccionModel: Model<Seccion>,
    @InjectModel(Grado.name)
    private gradoModel: Model<Grado>,
    @InjectModel(PeriodoEscolar.name)
    private periodoEscolarModel: Model<PeriodoEscolar>
  ) {}

  async create(createSeccionGradoPeriodoDto: CreateSeccionGradoPeriodoDto) {
    const seccion = await this.seccionModel.findById(createSeccionGradoPeriodoDto.seccion_id)
    if (!seccion) {
      throw new BadRequestException('Sección no encontrada')
    }

    const grado = await this.gradoModel.findById(createSeccionGradoPeriodoDto.grado_id)
    if (!grado) {
      throw new BadRequestException('Grado no encontrado')
    }

    const periodo = await this.periodoEscolarModel.findById(createSeccionGradoPeriodoDto.periodo_id)
    if (!periodo) {
      throw new BadRequestException('Periodo no encontrado')
    }

    const seccionGradoPeriodo = new this.seccionGradoPeriodoModel({
      seccion,
      grado,
      periodo
    })

    await seccionGradoPeriodo.save()

    return this.seccionGradoPeriodoModel.findById(seccionGradoPeriodo._id)
      .populate(['seccion', 'grado', 'periodo'])
  }

  async findAll() {
    return await this.seccionGradoPeriodoModel.find()
    .populate(['seccion', 'grado', 'periodo'])
  }

  async findOne(secciongp_id: string) {
    return await this.seccionGradoPeriodoModel.findById(secciongp_id)
    .populate(['seccion', 'grado', 'periodo'])
  }

  async update(secciongp_id: string, updateSeccionGradoPeriodoDto: UpdateSeccionGradoPeriodoDto) {
    const seccionGradoPeriodo = await this.seccionGradoPeriodoModel.findById(secciongp_id)
    if (!seccionGradoPeriodo) {
      throw new BadRequestException('SecciónGradoPeriodo no encontrado')
    }

    const seccionId = new Types.ObjectId(updateSeccionGradoPeriodoDto.seccion_id)
    const gradoId = new Types.ObjectId(updateSeccionGradoPeriodoDto.grado_id)
    const periodoId = new Types.ObjectId(updateSeccionGradoPeriodoDto.periodo_id)

    const seccion = await this.seccionModel.findById(seccionId)
    if (!seccion) {
      throw new BadRequestException('Sección no encontrada')
    }
    const grado = await this.gradoModel.findById(gradoId)
    if (!grado) {
      throw new BadRequestException('Grado no encontrado')
    }
    const periodo = await this.periodoEscolarModel.findById(periodoId)
    if (!periodo) {
      throw new BadRequestException('Periodo Escolar no encontrado')
    }

    seccionGradoPeriodo.seccion = seccionId
    seccionGradoPeriodo.grado = gradoId
    seccionGradoPeriodo.periodo = periodoId

    await seccionGradoPeriodo.save()

    return this.seccionGradoPeriodoModel.findById(seccionGradoPeriodo._id)
      .populate(['seccion', 'grado', 'periodo'])
  }

  async remove(secciongp_id: string) {
    const seccionGradoPeriodo = await this.seccionGradoPeriodoModel.findById(secciongp_id)
      .populate('seccion')
    if (!seccionGradoPeriodo) {
      throw new BadRequestException('SecciónGradoPeriodo no encontrado')
    }
    await this.seccionGradoPeriodoModel.findByIdAndDelete(secciongp_id)

    const seccion = seccionGradoPeriodo.seccion._id
    await this.seccionModel.findByIdAndDelete(seccion)

    return { success: true }
  }

  async listarSeccionesPorGradoYPeriodo(gradoId: string, periodoId: string) {
    // Convierte los IDs a ObjectId
    const gradoObjectId = new mongoose.Types.ObjectId(gradoId);
    const periodoObjectId = new mongoose.Types.ObjectId(periodoId);

    const grado = await this.gradoModel.findById(gradoObjectId);
    if (!grado) {
      throw new BadRequestException('Grado no encontrado');
    }

    const periodo = await this.periodoEscolarModel.findById(periodoObjectId);
    if (!periodo) {
      throw new BadRequestException('Periodo no encontrado');
    }

    return await this.seccionGradoPeriodoModel
      .find({ grado: gradoObjectId, periodo: periodoObjectId })
      .populate(['seccion', 'grado', 'periodo']);
  }

}
