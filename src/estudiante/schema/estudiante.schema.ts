import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Multimedia } from 'src/multimedia/schema/multimedia.schema';
import { EstadoEstudiante } from '../enums/estado-estudiante.enum';

@Schema({ collection: 'Estudiante' })
export class Estudiante {
  @Prop()
  nombre: string;

  @Prop()
  apellido: string;

  @Prop()
  direccion: string;

  @Prop()
  numero_documento: string;

  @Prop({ type: Types.ObjectId, ref: 'Documento'})
  documento: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'PeriodoEscolar'})
  periodo: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Grado'})
  grado: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Seccion'})
  seccion: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Multimedia'})
  multimedia: Types.ObjectId | Multimedia;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Archivo' }] })
  archivo: Types.ObjectId[]; 

  @Prop({ type: Types.ObjectId, ref: 'User'})
  user: Types.ObjectId;

  @Prop({enum: EstadoEstudiante})
  estado: EstadoEstudiante;
}

export const EstudianteSchema = SchemaFactory.createForClass(Estudiante);