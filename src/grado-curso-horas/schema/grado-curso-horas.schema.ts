import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'GradoCursoHoras' })
export class GradoCursoHoras {
  @Prop()
  horas: number;

  @Prop({ type: Types.ObjectId, ref: 'Grado' })
  grado: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Curso' })
  curso: Types.ObjectId;
}

export const GradoCursoHorasSchema = SchemaFactory.createForClass(GradoCursoHoras);