// src/stripe/stripe.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { Pago, PagoSchema } from 'src/pago/schema/pago.schema';
import { PagoModule } from 'src/pago/pago.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pago.name, schema: PagoSchema }]),
    PagoModule
  ],
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService], // Export StripeService if you need it in other modules
})
export class StripeModule {}
