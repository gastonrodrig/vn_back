import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'DocumentosEstudiante' })
export class DocumentosEstudiante  {
  @Prop({ type: Types.ObjectId, ref: 'Estudiante' })
  estudiante: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Multimedia' }] })
  multimedia: Types.ObjectId[];
}

export const DocumentosEstudianteSchema = SchemaFactory.createForClass(DocumentosEstudiante);
