import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { EstadoSolicitudNotas } from '../enums/estado-solicitudNotas.enum';
import { TipoSolicitudNota } from '../enums/tipo-solicitudNota.enum';

@Schema({ collection: 'SolicitudNotas'})
export class SolicitudNotas {

    @Prop({ type: Types.ObjectId, ref: 'Docente'})
    docente: Types.ObjectId;

    @Prop()
    descripcion: string;

    @Prop({ type: Types.ObjectId, ref: 'Estudiante'})
    estudiante: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Curso'})
    curso: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Seccion'})
    seccion: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Bimestre'})
    bimestre: Types.ObjectId;

    @Prop(({enum: TipoSolicitudNota}))
    tipoNota: string;

    @Prop({ default: EstadoSolicitudNotas.PENDIENTE})
    estado: string; 

}

export const SolicitudNotasSchema = SchemaFactory.createForClass(SolicitudNotas)