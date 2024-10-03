import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'PeriodoSeccionCurso' })
export class PeriodoSeccionCurso {
  @Prop({ type: Types.ObjectId, ref: 'PeriodoEscolar' })
  periodo: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Seccion' })
  seccion: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Curso' })
  curso: Types.ObjectId;

}

export const PeriodoSeccionCursoSchema = SchemaFactory.createForClass(PeriodoSeccionCurso);