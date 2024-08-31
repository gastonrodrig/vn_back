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
      // Create a PaymentMethod from the token
      const paymentMethod = await this.stripe.paymentMethods.create({
        type: 'card',
        card: { token: createPagoDto.token },
      });

      // Create a PaymentIntent with the PaymentMethod
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: createPagoDto.amount * 100, // Stripe works with cents
        currency: createPagoDto.currency,
        payment_method: paymentMethod.id, // Use the PaymentMethod ID
        confirm: true, // Automatically confirms the PaymentIntent
        return_url: 'http://localhost:4200/', // Replace with your actual return URL
      });

      // Save payment details to database
      const createdPago = await this.pagoService.create({
        amount: createPagoDto.amount,
        currency: createPagoDto.currency,
        token: createPagoDto.token,
        // status: this.paymentIntent.status, // Map status to enum
      });

      return { paymentIntent, createdPago };
    } catch (error) {
      throw new Error(`Error en el procesamiento del pago: ${error.message}`);
    }
  }
}