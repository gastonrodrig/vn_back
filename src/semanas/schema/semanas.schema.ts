import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Semanas' })
export class Semanas {
  @Prop()
  nombre: string;

 
}

export const SemanasSchema = SchemaFactory.createForClass(Semanas);