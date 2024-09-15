import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cupos } from './schema/cupos.schema';
import { Model, Types } from 'mongoose';
import { Grado } from 'src/grado/schema/grado.schema';
import { PeriodoEscolar } from 'src/periodo-escolar/schema/periodo-escolar.schema';
import { CreateCuposDto } from './dto/create-cupos.dto';
import { UpdateCuposDto } from './dto/update-curso.dto';

@Injectable()
export class CuposService {
  constructor(
    @InjectModel(Cupos.name)
    private readonly cuposModel: Model<Cupos>,
    @InjectModel(Grado.name)
    private readonly gradoModel: Model<Grado>,
    @InjectModel(PeriodoEscolar.name)
    private readonly periodoModel: Model<PeriodoEscolar>,
  ) {}    

  async create(createCuposDto: CreateCuposDto){
    const grado = await this.gradoModel.findById(createCuposDto.grado_id)
    if(!grado){
      throw new BadRequestException('Grado no encontrado');
    }
    const periodo = await this.periodoModel.findById(createCuposDto.periodo_id)
    if(!periodo){
      throw new BadRequestException('Periodo no encontrado');
    }

    const confictoCupo = await this.cuposModel.findOne({
      grado: grado._id,
      periodo: periodo._id
    })
    if(confictoCupo){
      throw new BadRequestException('El grado o periodo se repite');
    }

    const cupos = new this.cuposModel({
      capacidad: createCuposDto.capacidad,
      vacantes_disponibles: createCuposDto.vacantes_disponibles,
      grado,
      periodo
    });
   
    await cupos.save()

    return this.cuposModel.findById(cupos._id)
      .populate(['grado','periodo'])
  }

  async findAll(){
    return await this.cuposModel.find()
      .populate(['grado','periodo'])
  }

  async findOne(cupos_id: string){
    return await this.cuposModel.findById(cupos_id)
      .populate(['grado','periodo'])
  }
  async update(cupos_id: string, updateCuposDto: UpdateCuposDto){
    const cupos = await this.cuposModel.findById(cupos_id)
    if(!cupos){
      throw new BadRequestException('Cupos no encontrado')
    }
      
    const gradoId = new Types.ObjectId(updateCuposDto.grado_id)
    const grado = await this.gradoModel.findById(gradoId)
    if(!grado){
      throw new BadRequestException('Grado no encontrado')
    }
    
    const periodoId = new Types.ObjectId(updateCuposDto.periodo_id)
    const periodo = await this.periodoModel.findById(periodoId)
    if(!periodo){
      throw new BadRequestException('Periodo no encontrado')
    }
    
    
    cupos.capacidad = updateCuposDto.capacidad,
    cupos.vacantes_disponibles = updateCuposDto.vacantes_disponibles,
    cupos.grado = gradoId,
    cupos.periodo = periodoId

    await cupos.save()

    return this.cuposModel.findById(cupos_id)
      .populate(['grado','periodo'])
  }

 
}
