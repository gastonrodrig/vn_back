// src/stripe/stripe.controller.ts
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { CreatePagoDto } from '../pago/dto/create-pago.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  async processPayment(@Body() createPagoDto: CreatePagoDto) {
    return this.stripeService.processPayment(createPagoDto);
  }
  @Get(':stripeOperationId/:paymentMethodId')
  async getPaymentDetails(@Param('stripeOperationId')stripeOperationId: string,  @Param('paymentMethodId') paymentMethodId: string){
    return this.stripeService.getPaymentDetails(stripeOperationId, paymentMethodId)
  }
}
