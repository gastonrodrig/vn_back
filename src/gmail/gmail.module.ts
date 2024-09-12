import { Module } from '@nestjs/common';
import { GmailService } from './gmail.service';
import { GmailController } from './gmail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Apoderado, ApoderadoSchema } from 'src/apoderado/schema/apoderado.schema';
import { StripeService } from 'src/stripe/stripe.service';
import { PagoModule } from 'src/pago/pago.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Apoderado.name, schema: ApoderadoSchema}
    ]),
    PagoModule
  ],
  providers: [GmailService, StripeService],
  controllers: [GmailController]
})
export class GmailModule {}
