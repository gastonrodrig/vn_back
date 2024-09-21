import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Rol } from './schema/rol.schema';
import { CreateRolDto } from './dto/create-rol.dto';

@Injectable()
export class RolService {
  constructor(
    @InjectModel(Rol.name)
    private readonly rolModel: Model<Rol>
  ) {}

  async create(createRolDto: CreateRolDto) {
    const rol = new this.rolModel({
      nombre: createRolDto.nombre,
      descripcion: createRolDto.descripcion
    });
  
    return await rol.save();
  }

  async findAll() {
    return await this.rolModel.find()
  }

  async findOne(rol_id: string) {
    return await this.rolModel.findById(rol_id)
  }

  async remove(rol_id: string) {
    const rol = await this.rolModel.findByIdAndDelete(rol_id)
    if (!rol) {
      throw new BadRequestException('Rol no encontrado')
    }

    return { success: true }
  }
}
