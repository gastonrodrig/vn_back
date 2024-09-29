import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Multimedia } from 'src/multimedia/schema/multimedia.schema';

@Schema({ collection: 'Tutor'})
export class Tutor {
   @Prop()
   nombre: string;
   
   @Prop()
   apellido: string;

   @Prop()
   direccion: string;

   @Prop()
   telefono: string;

   @Prop()
   numero_documento: string;

   @Prop({ type: Types.ObjectId, ref: 'Documento'})
   documento: Types.ObjectId;

   @Prop({ type: Types.ObjectId, ref: 'Multimedia'})
   multimedia: Types.ObjectId | Multimedia;

   @Prop({ type: Types.ObjectId, ref: 'User' })
   user: Types.ObjectId;

   @Prop({ type: Types.ObjectId, ref: 'Seccion'})
   seccion: Types.ObjectId;

   @Prop({ type: Types.ObjectId, ref: 'Grado' })
   grado: Types.ObjectId;

   @Prop({ type: Types.ObjectId, ref: 'PeriodoEscolar' })
   periodo: Types.ObjectId;
}

export const TutorSchema = SchemaFactory.createForClass(Tutor)