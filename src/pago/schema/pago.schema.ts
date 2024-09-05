// src/pago/schemas/pago.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PagoStatus } from '../enums/estado-pago.enum';

@Schema({ collection: 'Pago' })
export class Pago extends Document {
  @Prop()
  amount: number;

  @Prop()
  currency: string;

  @Prop()
  paymentMethodId: string;

  @Prop()
  transactionDetails: string;

  @Prop({ enum: PagoStatus })
  status: PagoStatus;

  @Prop()
  stripeOperationId: string;
}

export const PagoSchema = SchemaFactory.createForClass(Pago);
