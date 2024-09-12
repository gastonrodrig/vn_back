import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'PeriodoEscolar' })
export class PeriodoEscolar {
  @Prop()
  anio: string;

  @Prop()
  fechaInicio: string;

  @Prop()
  fechaFin: string;
}

export const PeriodoEscolarSchema = SchemaFactory.createForClass(PeriodoEscolar);