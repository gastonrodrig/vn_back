import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'Tareas' })
export class Tareas {
    @Prop({ types: Types.ObjectId, ref: 'Estudiante'})
    estudiante: Types.ObjectId;
    
    @Prop({ type: Types.ObjectId, ref: 'Curso' })
    curso: Types.ObjectId;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'ArchivoTareas'}] })
    archivoTareas: Types.ObjectId[];
}

export const TareasSchema = SchemaFactory.createForClass(Tareas);