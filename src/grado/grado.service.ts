import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGradoDto } from './dto/create-grado.dto';
import { UpdateGradoDto } from './dto/update-grado.dto';
import { Grado } from './schema/grado.schema';

@Injectable()
export class GradoService {
  constructor(
    @InjectModel(Grado.name)
    private gradoModel: Model<Grado>
  ) {}

  async create(createGradoDto: CreateGradoDto) {
    const grado = new this.gradoModel(createGradoDto);
    return await grado.save()
  }

  async findAll() {
    return this.gradoModel.find()
  }

  async findOne(grado_id: string) {
    return this.gradoModel.findById(grado_id)
  }

  async update(grado_id: string, updateGradoDto: UpdateGradoDto) {
    const grado = await this.gradoModel.findById(grado_id)
    if (!grado) {
      throw new BadRequestException('Grado no encontrado')
    }

    grado.nombre = updateGradoDto.nombre

    return await grado.save()
  }

  async remove(grado_id: string) {
    const grado = await this.gradoModel.findByIdAndDelete(grado_id)
    if (!grado) {
      throw new BadRequestException('Grado no encontrado')
    }

    return { success: true }
  }
}
