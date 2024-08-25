import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'Documento' })
export class Documento {
  @Prop()
  type: string;
}

export const DocumentoSchema = SchemaFactory.createForClass(Documento);