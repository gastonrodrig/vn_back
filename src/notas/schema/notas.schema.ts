import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'Notas' })
export class Notas {
  @Prop({ types: Types.ObjectId, ref: 'Estudiante'})
  estudiante: Types.ObjectId;

  @Prop({ types: Types.ObjectId, ref: 'Docente'})
  docente: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Seccion'})
  seccion: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Grado'})
  grado: Types.ObjectId; 

  @Prop({ type: Types.ObjectId, ref: 'PeriodoEscolar' })
  periodo: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Curso' })
  curso: Types.ObjectId;

  @Prop()
  nota: number;
}

export const NotasSchema = SchemaFactory.createForClass(Notas)