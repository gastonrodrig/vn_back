import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Bimestre' })
export class Bimestre {
  @Prop()
  nombre: string;
}

export const BimestreSchema = SchemaFactory.createForClass(Bimestre);