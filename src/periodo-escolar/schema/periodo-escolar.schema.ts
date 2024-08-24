import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'PeriodoEscolar' })
export class PeriodoEscolar {
  @Prop()
  anio: string;

  @Prop({ type: 'date' })
  fechaInicio: Date;

  @Prop({ type: 'date' })
  fechaFin: Date;
}

export const PeriodoEscolarSchema = SchemaFactory.createForClass(PeriodoEscolar);