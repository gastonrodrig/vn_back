import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bimestre } from './schema/bimestre.schema';
import { CreateBimestreDto } from './dto/create-bimestre.dto';
import { UpdateBimestreDto } from './dto/update-bimestre.dto';

@Injectable()
export class BimestreService {
  constructor(
    @InjectModel(Bimestre.name)
    private bimestreModel: Model<Bimestre>
  ) {}
    
  async create(createBimestreDto: CreateBimestreDto) {
    const conflictoPeriodo = await this.bimestreModel.findOne({
      nombre: createBimestreDto.nombre
    })
    if(conflictoPeriodo) {
      throw new BadRequestException('Ya existe un bimestre con el mismo nombre')
    }

    const bimestre = new this.bimestreModel({
      nombre: createBimestreDto.nombre,
    });
    return await bimestre.save()
  }
    
  async findAll() {
    return await this.bimestreModel.find()
  }
    
  async findOne(bimestre_id: string) {
    return await this.bimestreModel.findById(bimestre_id)
  }
    
  async update(bimestre_id: string, updateBimestre: UpdateBimestreDto) {
    const bimestre = await this.bimestreModel.findById(bimestre_id)
    if (!bimestre) {
      throw new BadRequestException('Bimestre no encontrado')
    }

    bimestre.nombre = updateBimestre.nombre
  
    return await bimestre.save()
  }
}
