import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PagoService } from '../pago/pago.service';
import { CreatePagoDto } from '../pago/dto/create-pago.dto';
import { Pago } from '../pago/schema/pago.schema';
import { PagoStatus } from 'src/pago/enums/estado-pago.enum';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    @InjectModel(Pago.name) 
    private readonly pagoService: PagoService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    });
  }

  async processPayment(createPagoDto: CreatePagoDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: createPagoDto.monto * 30,
      currency: createPagoDto.divisa,
      payment_method: createPagoDto.paymentMethodId,
      confirm: true,
      return_url: 'http://localhost:4200/',
      metadata: createPagoDto.metadata,
    });

    const paymentDate = new Date(paymentIntent.created * 1000).toISOString();

    const createdPago = await this.pagoService.create({
      monto: createPagoDto.monto,
      divisa: createPagoDto.divisa,
      paymentMethodId: createPagoDto.paymentMethodId,
      nombre_completo: createPagoDto.nombre_completo,
      transactionDetails: paymentIntent.status,
      stripeOperationId: paymentIntent.id,
      status: paymentIntent.status === 'succeeded' ? PagoStatus.APROBADO : PagoStatus.RECHAZADO,
      metadata: createPagoDto.metadata,
      paymentDate,
    });

    return { paymentIntent, createdPago, stripeOperationId: paymentIntent.id};
  }

  async getPaymentDetails(stripeOperationId: string) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(stripeOperationId);
      const paymentMethod = await this.stripe.paymentMethods.retrieve(paymentIntent.payment_method as string);

      const paymentDate = new Date(paymentIntent.created * 1000).toLocaleString();

      return {
        paymentIntent,
        paymentMethod,
        paymentDate,
      };
    } catch (error) {
      throw new Error(`Error al recuperar los detalles del pago: ${error.message}`);
    }
  }
}
