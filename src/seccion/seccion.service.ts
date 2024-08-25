import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seccion } from './schema/seccion.schema';
import { CreateSeccionDto } from './dto/create-seccion.dto';
import { UpdateSeccionDto } from './dto/update-seccion.dto';

@Injectable()
export class SeccionService {
  constructor(
    @InjectModel(Seccion.name)
    private seccionModel: Model<Seccion>
  ) {}

  async create(createSeccionDto: CreateSeccionDto) {
    const seccion = new this.seccionModel({
      nombre: createSeccionDto.nombre,
      aula: createSeccionDto.aula
    });
    
    return await seccion.save()
  }

  async findAll() {
    return await this.seccionModel.find()
  }

  async findOne(seccion_id: string) {
    return await this.seccionModel.findById(seccion_id)
  }

  async update(seccion_id: string, updateSeccionDto: UpdateSeccionDto) {
    const seccion = await this.seccionModel.findById(seccion_id)
    if (!seccion) {
      throw new BadRequestException('Seccion no encontrada')
    }

    seccion.nombre = updateSeccionDto.nombre
    seccion.aula = updateSeccionDto.aula

    return await seccion.save()
  }

  async remove(seccion_id: string) {
    const seccion = await this.seccionModel.findByIdAndDelete(seccion_id)
    if (!seccion) {
      throw new BadRequestException('Seccion no encontrada')
    }

    return { success: true }
  }
}
