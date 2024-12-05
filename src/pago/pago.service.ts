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
    const pagos = await this.pagoModel.find();
  
    return pagos.map((pago) => ({
      ...pago.toObject(),
      tipoServicio: pago.metadata && pago.metadata.tipoServicio 
        ? pago.metadata.tipoServicio
        : (pago.transactionDetails && pago.transactionDetails.includes('pensión') 
            ? 'Pensión' 
            : 'Matrícula'),
    }));
  }

  async getGananciasPorMes() {
    const pagos = await this.pagoModel.find();

    const gananciasPorMes = pagos.reduce((acc, pago) => {
      const mes = pago.paymentDate.substring(0, 7);

      if (acc[mes]) {
        acc[mes] += pago.monto;
      } else {
        acc[mes] = pago.monto;
      }

      return acc;
    }, {});

    const resultados = Object.keys(gananciasPorMes).map(mes => ({
      _id: mes,
      totalGanancias: gananciasPorMes[mes],
    }));

    return resultados.sort((a, b) => (a._id > b._id ? 1 : -1));
  }
}
