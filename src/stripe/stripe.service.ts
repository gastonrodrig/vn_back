import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Stripe from 'stripe';
import { PagoService } from '../pago/pago.service';
import { CreatePagoDto } from '../pago/dto/create-pago.dto';
import { Pago } from '../pago/schema/pago.schema';
import { PagoStatus } from 'src/pago/enums/estado-pago.enum';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    @InjectModel(Pago.name) private readonly pagoModel: Model<Pago>,
    private readonly pagoService: PagoService,
  ) {
    this.stripe = new Stripe('sk_test_51Pr2OvGk8XuMQuxy0ABi7akl8PupLQQdqSjxUwjmwzlYVAn0y4smWGp4zQ9quYkMP8WH6m4ugtOZNXBdOHeBXDCL001wGX9xMW', {
      apiVersion: '2024-06-20',
    });
  }

  async processPayment(createPagoDto: CreatePagoDto): Promise<any> {
    try {
      console.log('Received DTO:', createPagoDto);
  
      // Create a PaymentIntent with the PaymentMethodId
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: createPagoDto.amount * 100,
        currency: createPagoDto.currency,
        payment_method: createPagoDto.paymentMethodId,
        confirm: true,
        return_url: 'http://localhost:4200/',
      });
  
      console.log('Created PaymentIntent:', paymentIntent);
  
      // Save payment details to database
      const createdPago = await this.pagoService.create({
        amount: createPagoDto.amount,
        currency: createPagoDto.currency,
        paymentMethodId: createPagoDto.paymentMethodId,
        stripeOperationId: paymentIntent.id,
        status: PagoStatus.PENDIENTE
      });
  
      return { paymentIntent, createdPago };
    } catch (error) {
      console.error('Error in processing payment:', error);
      throw new Error(`Error en el procesamiento del pago: ${error.message}`);
    }
  }
}