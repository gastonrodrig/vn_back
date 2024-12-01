import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Multimedia } from 'src/multimedia/schema/multimedia.schema';

@Schema({ collection: 'Docente' })
export class Docente {
  @Prop()
  nombre: string;

  @Prop()
  apellido: string;

  direccion: string;

  @Prop()
  telefono: string;

  @Prop()
  numero_documento: string;

  @Prop({ type: Types.ObjectId, ref: 'Documento' })
  documento: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Multimedia' })
  multimedia: Types.ObjectId | Multimedia;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;
}

export const DocenteSchema = SchemaFactory.createForClass(Docente);