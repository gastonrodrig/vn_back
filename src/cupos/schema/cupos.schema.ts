import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'Cupos' })
export class Cupos {
  @Prop()
  capacidad: number;

  @Prop()
  vacantes_disponibles: number;

  @Prop({ type: Types.ObjectId, ref: 'Grado' })
  grado: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'PeriodoEscolar' })
  periodo: Types.ObjectId;
}

export const CuposSchema = SchemaFactory.createForClass(Cupos);