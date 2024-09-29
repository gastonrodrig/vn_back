import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { EstadoSolicitud } from '../enums/estado-solicitud.enum';

@Schema({ collection: 'Solicitud' })
export class Solicitud {
  @Prop()
  nombre_hijo: string;

  @Prop()
  apellido_hijo: string;

  @Prop()
  dni_hijo: string;

  @Prop()
  telefono_padre: string;

  @Prop()
  correo_padre: string;

  @Prop({ type: Types.ObjectId, ref: 'Grado', })
  grado: Types.ObjectId;

  @Prop({ default: EstadoSolicitud.PENDIENTE })
  estado: string; 

  @Prop()
  fecha_solicitud: Date;
}

export const SolicitudSchema = SchemaFactory.createForClass(Solicitud);
