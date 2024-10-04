import { Module } from '@nestjs/common';
import { GmailService } from './gmail.service';
import { GmailController } from './gmail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StripeService } from 'src/stripe/stripe.service';
import { PagoModule } from 'src/pago/pago.module';
import { Pago, PagoSchema } from 'src/pago/schema/pago.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Pago.name, schema: PagoSchema}
    ]),
    PagoModule
  ],
  providers: [GmailService, StripeService],
  controllers: [GmailController]
})
export class GmailModule {}
