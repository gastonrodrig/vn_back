import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'SeccionCurso' })
export class SeccionCurso {

  @Prop({ type: Types.ObjectId, ref: 'Seccion' })
  seccion: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Curso' })
  curso: Types.ObjectId;

}

export const SeccionCursoSchema = SchemaFactory.createForClass(SeccionCurso);