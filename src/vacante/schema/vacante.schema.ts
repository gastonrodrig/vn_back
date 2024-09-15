import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { EstadoVacante } from "../enum/estado-vacante.enum";
import { Types } from "mongoose";

@Schema({collection: 'Vacante'})

export class Vacante{
    @Prop({ type: Types.ObjectId, ref: 'Estudiante'})
    estudiante: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Grado'})
    grado: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'PeriodoEscolar'})
    periodo: Types.ObjectId;

    @Prop({enum: EstadoVacante, default: EstadoVacante.RESERVADO})
    estado: EstadoVacante;

}
export const VacanteSchema = SchemaFactory.createForClass(Vacante);