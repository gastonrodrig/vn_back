import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';
import { EstadoPension } from "../enums/estado-pension.enum";
import { MetodoPago } from "../enums/metodo-pago.enum";

@Schema({ collection: 'Pension'})
export class Pension{ 

  @Prop({ type: Types.ObjectId, ref: 'Estudiante' })
  estudiante: Types.ObjectId;

  @Prop({ enum: MetodoPago })
  metodo_pago: string;

  @Prop()
  monto: number;

  @Prop()
  n_operacion: string;

  @Prop()
  fecha_inicio: string;

  @Prop()
  fecha_limite: string;

  @Prop({enum: EstadoPension, default: 'PENDIENTE'})
  estado: string;

  @Prop()
  mes: string;
}

export const PensionSchema = SchemaFactory.createForClass(Pension);