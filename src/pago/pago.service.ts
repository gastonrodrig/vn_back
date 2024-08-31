// src/pago/pago.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePagoDto } from './dto/create-pago.dto';
import { Pago } from './schema/pago.schema';

@Injectable()
export class PagoService {
  constructor(@InjectModel(Pago.name) private readonly pagoModel: Model<Pago>) {}

  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    const createdPago = new this.pagoModel(createPagoDto);
    return createdPago.save();
  }

  // Otros métodos como find, findById, etc. pueden ser añadidos aquí.
}
