import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ collection: 'Horario' })
export class Horario { 
  @Prop()
  dia_semana: string;

  @Prop()
  hora_inicio: string;

  @Prop()
  hora_fin: string;

  @Prop({ type: Types.ObjectId, ref: 'Seccion'})
  seccion: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Grado'})
  grado: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Curso'})
  curso: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Docente'})
  docente: Types.ObjectId;
}

export const HorarioSchema = SchemaFactory.createForClass(Horario);