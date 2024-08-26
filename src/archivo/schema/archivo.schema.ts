import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Archivo' })
export class Archivo  {
  _id: any;
  
  @Prop()
  nombre: string;

  @Prop()
  url: string;

  @Prop()
  tamanio: number;
}

export const ArchivoSchema = SchemaFactory.createForClass(Archivo);
