import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema({ collection: 'Solicitud' })
export class Solicitud {

    //CREO QUE YA ESTA LISTO POR AHORA DECLARE VARAIBLES Y LISTO
  @Prop({ required: true })
  nombre_hijo: string;

  @Prop({ required: true })
  apellido_hijo: string;

  @Prop({ required: true })
  dni_hijo: string;

  @Prop({ required: true })
  telefono_padre: string;

  @Prop({ required: true })
  correo_padre: string;

  @Prop({ type: Types.ObjectId, ref: 'Grado', required: true })
  grado_ID: Types.ObjectId;

  @Prop({ required: true })
  estado: string; // PENDIENTE, APROBADO, RECHAZADO

  @Prop({ required: true })
  fecha_solicitud: Date;
}

export const SolicitudSchema = SchemaFactory.createForClass(Solicitud);
