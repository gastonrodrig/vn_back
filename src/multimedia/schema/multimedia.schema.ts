import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'Multimedia' })
export class Multimedia {
  @Prop()
  nombre: string;

  @Prop()
  url: string;

  @Prop()
  tamanio: number;

  @Prop({ type: Types.ObjectId, ref: 'Estudiante' })
  estudiante: Types.ObjectId | Multimedia;  

  @Prop({ type: Types.ObjectId, ref: 'Docente' })
  docente: Types.ObjectId | Multimedia;  

  @Prop({ type: Types.ObjectId, ref: 'Apoderado' })
  apoderado: Types.ObjectId | Multimedia;  

  _id: any;
}

export const MultimediaSchema = SchemaFactory.createForClass(Multimedia);