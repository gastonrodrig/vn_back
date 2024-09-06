// src/pago/pago.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PagoService } from './pago.service';
import { PagoController } from './pago.controller';
import { Pago, PagoSchema } from './schema/pago.schema';
import { GmailService } from 'src/gmail/gmail.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pago.name, schema: PagoSchema }])],
  providers: [PagoService, GmailService],
  controllers: [PagoController],
  exports: [PagoService],
})
export class PagoModule {}
