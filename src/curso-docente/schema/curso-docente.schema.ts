import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'CursoDocente' })
export class CursoDocente {
  @Prop({ type: Types.ObjectId, ref: 'Curso' })
  curso: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Docente' })
  docente: Types.ObjectId;
}

export const CursoDocenteSchema = SchemaFactory.createForClass(CursoDocente);