import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { CartItemDto } from './dto/cart-item.dto';

@Injectable()
export class PaymentService {
  private stripe

  constructor() {
    // Revisa que estés usando la clave secreta
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    });
  }

  async checkout(cartItems: CartItemDto[]) {
    // Calcula el precio total basado en la cantidad y el precio de cada ítem
    const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    // Crea el PaymentIntent en Stripe
    return await this.stripe.paymentIntents.create({
      amount: totalPrice * 100, // Stripe trabaja con centavos, por eso multiplicamos por 100
      currency: 'pen', // Cambia esto si usas otra moneda
      payment_method_types: ['card'],
    });
  }
}
