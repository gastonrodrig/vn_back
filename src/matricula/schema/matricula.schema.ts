import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { TipoRegistro } from '../enums/tipo-registro.enum';

@Schema({ collection: 'Matricula' })
export class Matricula {
  @Prop()
  monto: string;

  @Prop()
  metodo_pago: string;

  @Prop()
  n_operacion: string;

  @Prop()
  fecha: Date;

  @Prop({ type: Types.ObjectId, ref: 'PeriodoEscolar' })
  periodo: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Estudiante' })
  estudiante: Types.ObjectId;

  @Prop({ enum: TipoRegistro})
  tipo: TipoRegistro;

}

export const MatriculaSchema = SchemaFactory.createForClass(Matricula);