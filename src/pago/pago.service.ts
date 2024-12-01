import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePagoDto } from './dto/create-pago.dto';
import { Pago } from './schema/pago.schema';

@Injectable()
export class PagoService {
  constructor(@InjectModel(Pago.name) private readonly pagoModel: Model<Pago>) {}

  async create(createPagoDto: CreatePagoDto) {
    const createdPago = new this.pagoModel(createPagoDto);

    await createdPago.save()

    return createdPago
  }

  async findAll() {
    return this.pagoModel.find()
      
  }
}
