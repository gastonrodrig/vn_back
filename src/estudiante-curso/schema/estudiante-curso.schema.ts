import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

Schema({ collection: 'EstudianteCurso' })
export class EstudianteCurso {
  @Prop({ types: Types.ObjectId, ref: 'Estudiante'})
  estudiante: Types.ObjectId;

  @Prop({ types: Types.ObjectId, ref: 'Curso'})
  curso: Types.ObjectId;
}

export const EstudianteCursoSchema = SchemaFactory.createForClass(EstudianteCurso)