import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Multimedia' })
export class Multimedia {
  _id: any;

  @Prop()
  nombre: string;

  @Prop()
  url: string;

  @Prop()
  tamanio: number;
}

export const MultimediaSchema = SchemaFactory.createForClass(Multimedia);
