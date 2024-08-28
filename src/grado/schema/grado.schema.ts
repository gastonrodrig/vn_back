import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Grado' })
export class Grado {
  @Prop()
  nombre: string;
}

export const GradoSchema = SchemaFactory.createForClass(Grado)