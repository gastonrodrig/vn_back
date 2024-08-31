// src/stripe/stripe.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreatePagoDto } from '../pago/dto/create-pago.dto';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  async processPayment(@Body() createPagoDto: CreatePagoDto) {
    return this.stripeService.processPayment(createPagoDto);
  }
}
