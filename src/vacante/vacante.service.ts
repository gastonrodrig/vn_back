import { BadRequestException, Injectable } from '@nestjs/common';
import { Vacante } from './schema/vacante.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVacanteDto } from './dto/create-vacante.dto';
import { Estudiante } from 'src/estudiante/schema/estudiante.schema';
import { Grado } from 'src/grado/schema/grado.schema';
import { PeriodoEscolar } from 'src/periodo-escolar/schema/periodo-escolar.schema';
import { UpdateEstadoVacanteDto } from './dto/update-estado.dto';

@Injectable()
export class VacanteService {
  constructor(
    @InjectModel(Vacante.name)
    private readonly vacanteModel: Model<Vacante>,
    @InjectModel(Estudiante.name)
    private readonly estudianteModel: Model<Estudiante>,
    @InjectModel(Grado.name)
    private readonly gradoModel: Model<Grado>,
    @InjectModel(PeriodoEscolar.name)
    private readonly periodoModel: Model<PeriodoEscolar>
  ){}

  async create(createVacanteDto: CreateVacanteDto){
    const estudiante = await this.estudianteModel.findById(createVacanteDto.estudiante_id)
    if(!estudiante){
      throw new BadRequestException('Estudiante no encontrado');
    }

    const grado = await this.gradoModel.findById(createVacanteDto.grado_id)
    if(!grado){
      throw new BadRequestException('Grado no encontrado');
    }

    const periodo = await this.periodoModel.findById(createVacanteDto.periodo_id)
    if(!periodo){
      throw new BadRequestException('Periodo no encontrado');
    }
    
    const vacante = new this.vacanteModel({
      estudiante,
      grado,
      periodo,
    })

    return await vacante.save()
  }

  async findAll(){
    return await this.vacanteModel.find()
      .populate(['estudiante','grado','periodo'])
  }

  async findOne(vacante_id: string){
    return await this.vacanteModel.findById(vacante_id)
      .populate(['estudiante','grado','periodo'])
  }

  async remove(vacante_id: string){
    const vacante = await this.vacanteModel.findById(vacante_id)
    if(!vacante){
        throw new BadRequestException('Vacante no encontrada')
    }

    await this.vacanteModel.findByIdAndDelete(vacante_id)

    return{sucess: true}
  }

  async updateEstado(vacante_id: string, updateEstadoVacanteDto: UpdateEstadoVacanteDto) {
    const vacante = await this.vacanteModel.findById(vacante_id)
    if (!vacante) {
      throw new BadRequestException('Vacante no encontrada')
    }

    vacante.estado = updateEstadoVacanteDto.estado;
  
    await vacante.save()

    return this.vacanteModel.findById(vacante._id)
      .populate(['estudiante','grado','periodo'])
  }
}
