
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { EstadoAsistencia } from '../enums/estado-asistencia.enum';

@Schema({ collection: 'Asistencia' })
export class Asistencia {
  @Prop({ types: Types.ObjectId, ref: 'Estudiante'})
  estudiante: Types.ObjectId;

  @Prop({ types: Types.ObjectId, ref: 'Tutor'})
  tutor: Types.ObjectId;

  @Prop({enum: EstadoAsistencia})
  estado: string;

  @Prop({ type: Types.ObjectId, ref: 'Seccion'})
  seccion: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Grado'})
  grado: Types.ObjectId; 

  @Prop({ type: Types.ObjectId, ref: 'PeriodoEscolar' })
  periodo: Types.ObjectId;

  @Prop()
  fecha: string;
}

export const AsistenciaSchema = SchemaFactory.createForClass(Asistencia);