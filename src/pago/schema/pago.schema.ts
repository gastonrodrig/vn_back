import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { PagoStatus } from '../enums/estado-pago.enum';

@Schema({ collection: 'Pago' })
export class Pago extends Document {
  @Prop()
  monto: number;

  @Prop()
  divisa: string;

  @Prop()
  paymentMethodId: string;

  @Prop()
  nombre_completo: string;

  @Prop()
  transactionDetails: string;

  @Prop({ enum: PagoStatus })
  status: PagoStatus;

  @Prop()
  stripeOperationId: string;

  @Prop({ type: Object })
  metadata: {
    tipoDocumento: string;
    nroDocumento: string;
    estudiante: { type: Types.ObjectId, ref: 'Estudiante' },
  };

  @Prop()
  paymentDate: string;
}

export const PagoSchema = SchemaFactory.createForClass(Pago);
