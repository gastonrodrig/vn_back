import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'EstudianteCursoPeriodo' })
export class EstudianteCursoPeriodo {
  @Prop({ types: Types.ObjectId, ref: 'Estudiante'})
  estudiante: Types.ObjectId;

  @Prop({ types: Types.ObjectId, ref: 'Curso'})
  curso: Types.ObjectId;

  @Prop({ types: Types.ObjectId, ref: 'PeriodoEscolar'})
  periodo: Types.ObjectId;
}

export const EstudianteCursoPeriodoSchema = SchemaFactory.createForClass(EstudianteCursoPeriodo)