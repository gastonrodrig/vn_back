import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Curso' })
export class Curso {
  @Prop()
  nombre: string;
}

export const CursoSchema = SchemaFactory.createForClass(Curso);