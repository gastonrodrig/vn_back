// src/pago/schemas/pago.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PagoStatus } from '../enums/estado-pago.enum';

@Schema({ collection: 'Pago' })
export class Pago extends Document {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  paymentMethodId: string;

  @Prop({ enum: PagoStatus, default: PagoStatus.PENDIENTE })
  status: PagoStatus;

  @Prop()
  stripeOperationId: string; // Stripe's unique operation ID
}

export const PagoSchema = SchemaFactory.createForClass(Pago);
