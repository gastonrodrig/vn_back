import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'ArchivoTareas' })
export class ArchivoTareas {
    _id: any;

    @Prop()
    nombre: string;

    @Prop()
    url: string;

    @Prop()
    tamanio: number;
}

export const ArchivoTareasSchema = SchemaFactory.createForClass(ArchivoTareas)