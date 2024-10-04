import { BadRequestException, Injectable } from '@nestjs/common';
import { Pension } from './schema/pension.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Estudiante } from 'src/estudiante/schema/estudiante.schema';
import { CreatePensionDto } from './dto/create-pension.dto';
import { updatePensionDto } from './dto/update-pension.dto';
import { MetodoPago } from './enums/metodo-pago.enum';

@Injectable()
export class PensionService {
  constructor(
    @InjectModel(Pension.name)
    private readonly pensionModel: Model<Pension>,
    @InjectModel(Estudiante.name)
    private readonly estudianteModel: Model<Estudiante>,
  ) {}
  async create(createPensionDto: CreatePensionDto){
    const estudiante = await this.estudianteModel.findById(createPensionDto.estudiante_id)
    if (!estudiante){
      throw new BadRequestException('Estudiante no encontrado')
    }
    let n_operacion = createPensionDto.n_operacion;
    if (createPensionDto.metodo_pago === MetodoPago.EFECTIVO) {
      n_operacion = null;
    }
    const pension = new this.pensionModel({
      estudiante,
      monto: createPensionDto.monto,
      metodo_pago: createPensionDto.metodo_pago,
      n_operacion: n_operacion,
      fecha_inicio: createPensionDto.fecha_inicio,
      fecha_limite: createPensionDto.fecha_limite,
      estado: createPensionDto.estado,
      mes: createPensionDto.mes,
    });
    return await pension.save()
  }
  
  async findAll(){
    return await this.pensionModel.find()
    .populate(['estudiante'])
  }
  async findOne(pension_id: string){
    return await this.pensionModel.findById(pension_id)
    .populate(['estudiante'])
  }
  async update(pension_id: string,updatePensionDto: updatePensionDto){
    const pension = await this.pensionModel.findById(pension_id)
    if(!pension){
      throw new BadRequestException('Pension no encontrada')
    }
    const estudianteId= new Types.ObjectId(updatePensionDto.estudiante_id)
    const estudiante = await this.estudianteModel.findById(estudianteId)
    if(!estudiante){
      throw new BadRequestException('Estudiante no encontrado')
    }
    pension.monto = updatePensionDto.monto
    pension.metodo_pago = updatePensionDto.metodo_pago
    if (updatePensionDto.metodo_pago === MetodoPago.EFECTIVO) {
      pension.n_operacion = null;
    } else {
      pension.n_operacion = updatePensionDto.n_operacion;
    }
    pension.fecha_inicio = updatePensionDto.fecha_inicio
    pension.fecha_limite = updatePensionDto.fecha_limite
    pension.estado = updatePensionDto.estado
    pension.mes = updatePensionDto.mes

    await pension.save()

    return this.pensionModel.findById(pension._id)
    .populate(['estudiante'])
  }
}