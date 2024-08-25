import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PeriodoEscolar } from './schema/periodo-escolar.schema';
import { CreatePeriodoEscolarDto } from './dto/create-periodo-escolar.dto';
import { UpdatePeriodoEscolarDto } from './dto/update-periodo-escolar.dto';

@Injectable()
export class PeriodoEscolarService {
  constructor(
    @InjectModel(PeriodoEscolar.name)
    private periodoEscolarModel: Model<PeriodoEscolar>
  ) {}

  async create(createPeriodoEscolarDto: CreatePeriodoEscolarDto) {
    const periodo = new this.periodoEscolarModel({
      anio: createPeriodoEscolarDto.anio,
      fechaInicio: createPeriodoEscolarDto.fechaInicio,
      fechaFin: createPeriodoEscolarDto.fechaFin
    });
    return await periodo.save()
  }

  async findAll() {
    return await this.periodoEscolarModel.find()
  }

  async findOne(periodo_id: string) {
    return await this.periodoEscolarModel.findById(periodo_id)
  }

  async update(periodo_id: string, updatePeriodoEscolarDto: UpdatePeriodoEscolarDto) {
    const periodo = await this.periodoEscolarModel.findById(periodo_id)
    if (!periodo) {
      throw new BadRequestException('Periodo Escolar no encontrado')
    }

    periodo.anio = updatePeriodoEscolarDto.anio
    periodo.fechaInicio = new Date(updatePeriodoEscolarDto.fechaInicio)
    periodo.fechaFin = new Date(updatePeriodoEscolarDto.fechaFin)

    return await periodo.save()
  }

  async remove(periodo_id: string) {
    const periodo = await this.periodoEscolarModel.findByIdAndDelete(periodo_id)
    if (!periodo) {
      throw new BadRequestException('Periodo Escolar no encontrado')
    }

    return { success: true }
  }
}
