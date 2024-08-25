import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Seccion' })
export class Seccion {
  @Prop()
  nombre: string;
  
  @Prop()
  aula: string;
}

export const SeccionSchema = SchemaFactory.createForClass(Seccion);