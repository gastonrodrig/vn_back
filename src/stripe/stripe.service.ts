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
    })
  }

  async processPayment(createPagoDto: CreatePagoDto) {
      // Validar que el rol del usuario sea Temporal

      // Create a PaymentIntent with the PaymentMethodId
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: createPagoDto.amount * 100,
        currency: createPagoDto.currency,
        payment_method: createPagoDto.paymentMethodId,
        confirm: true,
        return_url: 'http://localhost:4200/',
      });
  
      const createdPago = await this.pagoService.create({
        amount: createPagoDto.amount,
        currency: createPagoDto.currency,
        paymentMethodId: createPagoDto.paymentMethodId,
        stripeOperationId: paymentIntent.id,
        status: paymentIntent.status === 'succeeded' ? PagoStatus.APROBADO : PagoStatus.RECHAZADO,
        transactionDetails: paymentIntent.status,
      });

      return { paymentIntent, createdPago };
  }
}