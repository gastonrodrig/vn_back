import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { DiaResumenAsistencia } from '../enums/dia-resumen-asistencia.enum';

@Schema({ collection: 'ResumenAsistencia' })
export class ResumenAsistencia {
  @Prop({ type: Types.ObjectId, ref: 'Semanas' })
  semana: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Seccion'})
  seccion: Types.ObjectId;

  @Prop({ enum: DiaResumenAsistencia})
  dia: string;

  @Prop()
  fecha: string;

  @Prop()
  presentes: number;

  @Prop()
  faltas: number;

  @Prop()
  justificadas: number;
}

export const ResumenAsistenciaSchema = SchemaFactory.createForClass(ResumenAsistencia);