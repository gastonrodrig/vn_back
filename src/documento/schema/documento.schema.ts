import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Docente } from '../docente/schemas/docente.schema';
// import { Apoderado } from '../apoderado/schemas/apoderado.schema';
// import { Estudiante } from '../estudiante/schemas/estudiante.schema';

@Schema({ collection: 'Documento' })
export class Documento {
  @Prop()
  type: string;

  // @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'Docente' }] })
  // docente: Docente[];

  // @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'Apoderado' }] })
  // apoderado: Apoderado[];

  // @Prop({ type: [{ type: Schema.Types.ObjectId, ref: 'Estudiante' }] })
  // estudiante: Estudiante[];
}

export const DocumentoSchema = SchemaFactory.createForClass(Documento);