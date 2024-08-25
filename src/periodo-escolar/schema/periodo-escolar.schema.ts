import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'PeriodoEscolar' })
export class PeriodoEscolar {
  @Prop()
  anio: string;

  @Prop()
  fechaInicio: Date;

  @Prop()
  fechaFin: Date;
}

export const PeriodoEscolarSchema = SchemaFactory.createForClass(PeriodoEscolar);