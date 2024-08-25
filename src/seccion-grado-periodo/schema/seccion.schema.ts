import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Seccion } from 'src/seccion/schema/seccion.schema';
import { Grado } from 'src/grado/schema/grado.schema';
import { PeriodoEscolar } from 'src/periodo-escolar/schema/periodo-escolar.schema';

@Schema({ collection: 'SeccionGradoPeriodo' })
export class SeccionGradoPeriodo {
  @Prop({ type: Types.ObjectId, ref: 'Seccion' })
  seccion: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Grado' })
  grado: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'PeriodoEscolar' })
  periodo: Types.ObjectId;
}

export const SeccionGradoPeriodoSchema = SchemaFactory.createForClass(SeccionGradoPeriodo);