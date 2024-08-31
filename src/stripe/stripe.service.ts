import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreateStripeDto } from './dto/create-stripe.dto';

@Injectable()
export class StripeService {
  stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    });
  }

  async createPaymentIntent(createStripeDto: CreateStripeDto) {
    const { amount, currency } = createStripeDto;

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency,
    });

    return paymentIntent;
  }

  async handleWebhook(event: Stripe.Event) {
    // Manejar los eventos de Stripe aquí
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log(`PaymentIntent was successful for ${paymentIntent.amount}`);
        // Actualizar la base de datos o realizar acciones necesarias
        break;
      // Manejar otros eventos
      default:
        console.warn(`Unhandled event type ${event.type}`);
    }
  }
}
