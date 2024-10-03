import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Seccion } from 'src/seccion/schema/seccion.schema';
import { Curso } from 'src/curso/schema/curso.schema';
import { PeriodoEscolar } from 'src/periodo-escolar/schema/periodo-escolar.schema';

@Schema({ collection: 'PeriodoSeccionCurso' })
export class PeriodoSeccionCurso {
  @Prop({ type: Types.ObjectId, ref: 'PeriodoEscolar' })
  periodo: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Seccion' })
  seccion: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Curso' })
  curso: Types.ObjectId;

}

export const PeriodoSeccionCursoSchema = SchemaFactory.createForClass(PeriodoSeccionCurso);