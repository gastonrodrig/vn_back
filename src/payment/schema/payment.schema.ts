import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Payment' })
export class Payment {
  @Prop()
  name: string

  @Prop()
  price: number

  @Prop()
  quantity: number
}

export const PaymentSchema = SchemaFactory.createForClass(Payment)