import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Multimedia } from 'src/multimedia/schema/multimedia.schema';

@Schema({ collection: 'Apoderado' })
export class Apoderado {
   @Prop()
   nombre: string;
   
   @Prop()
   apellido: string;

   @Prop()
   numero: string;

   @Prop()
   correo: string;
   
   @Prop()
   direccion: string;

   @Prop()
   numero_documento: string;
   
   @Prop({ type: Types.ObjectId, ref: 'Documento'})
   documento: Types.ObjectId;

   @Prop({ types: Types.ObjectId, ref: 'Estudiante'})
   estudiante: Types.ObjectId;

   @Prop({ type: Types.ObjectId, ref: 'Multimedia' })
   multimedia: Types.ObjectId | Multimedia;

   @Prop({ type: Types.ObjectId, ref: 'User' })
   user: Types.ObjectId;
}

export const ApoderadoSchema = SchemaFactory.createForClass(Apoderado)