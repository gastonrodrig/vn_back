import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Grado' })
export class Grado {
  @Prop()
  nombre: string;

  @Prop()
  nivel: number;
}

export const GradoSchema = SchemaFactory.createForClass(Grado)