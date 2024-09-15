import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { TipoRegistro } from '../enums/tipo-registro.enum';
import { MetodoPago } from '../enums/metodo-pago.enum';
import { tipoMatricula } from '../enums/tipo-matricula.enums';

@Schema({ collection: 'Matricula' })
export class Matricula {
  @Prop()
  monto: number;

  @Prop({ enum: MetodoPago })
  metodo_pago: string;

  @Prop()
  n_operacion: string | null; 
  
  @Prop()
  fecha: Date;

  @Prop({ type: Types.ObjectId, ref: 'PeriodoEscolar' })
  periodo: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Estudiante' })
  estudiante: Types.ObjectId;

  @Prop({ enum: TipoRegistro})
  tipo: TipoRegistro;

  @Prop({ enum: tipoMatricula})
  tipoMa: tipoMatricula;
}

export const MatriculaSchema = SchemaFactory.createForClass(Matricula);