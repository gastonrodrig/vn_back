import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Semanas, SemanasSchema } from './schema/semanas.schema';
import { CreateSemanasDto } from './dto/create-semanas.dto';
import { UpdateSemanasDto } from './dto/update-semanas.dto';

@Injectable()
export class SemanasService {
    constructor(
        @InjectModel(Semanas.name)
        private semanasModel: Model<Semanas>
      ) {}
    
      async create(createSemanasDto: CreateSemanasDto) {
        const conflictoPeriodo = await this.semanasModel.findOne({
          nombre: createSemanasDto.nombre
        })
        if(conflictoPeriodo) {
          throw new BadRequestException('Ya existe un semana con el mismo nombre')
        }
    
        const periodo = new this.semanasModel({
          nombre: createSemanasDto.nombre,
        
        });
        return await periodo.save()
      }
    
      async findAll() {
        return await this.semanasModel.find()
      }
    
      async findOne(semana_id: string) {
        return await this.semanasModel.findById(semana_id)
      }
    
      async update(semana_id: string, updateSemanasDto: UpdateSemanasDto) {
        const periodo = await this.semanasModel.findById(semana_id)
        if (!periodo) {
          throw new BadRequestException('semana no encontrado')
        }
    
        periodo.nombre = updateSemanasDto.nombre
      
        return await periodo.save()
      }

}
