import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'SeccionCursoDocente' })
export class SeccionCursoDocente {
    @Prop({ type: Types.ObjectId, ref: 'Seccion' })
    seccion: Types.ObjectId;
  
    @Prop({ type: Types.ObjectId, ref: 'Curso' })
    curso: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Docente' })
    docente: Types.ObjectId;
}

export const SeccionCursoDocenteSchema = SchemaFactory.createForClass(SeccionCursoDocente);