import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { TipoNota } from '../enums/tipo-nota.enum';

@Schema({ collection: 'Notas' })
export class Notas {
  @Prop({ types: Types.ObjectId, ref: 'Estudiante'})
  estudiante: Types.ObjectId;

  @Prop({ types: Types.ObjectId, ref: 'Docente'})
  docente: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Seccion'})
  seccion: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Grado'})
  grado: Types.ObjectId; 

  @Prop({ type: Types.ObjectId, ref: 'PeriodoEscolar' })
  periodo: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Curso' })
  curso: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Bimestre'})
  bimestre: Types.ObjectId;

  @Prop()
  nota: number;

  @Prop()
  notaLetra: string;

  @Prop(({enum: TipoNota}))
  tipoNota: string;

  @Prop()
  estado: string;
}

export const NotasSchema = SchemaFactory.createForClass(Notas)