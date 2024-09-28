import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';

@Schema({ collection: 'Pension'})
export class Pension{ 

  @Prop({ type: Types.ObjectId, ref: 'Estudiante' })
  estudiante: Types.ObjectId;

  @Prop()
  monto: number;

  @Prop({ type: String})
  fecha_incio: Date;

  @Prop()
  fecha_limite: Date;

  @Prop({enum: ['PENDIENTE, PAGADO,VENCIDO'], default: 'PENDIENTE'})
  estado: string;

  @Prop()
  mes: string;
}

export const PensionSchema = SchemaFactory.createForClass(Pension);