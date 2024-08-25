import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Roles } from "src/auth/enums/rol.enum";

@Schema({ collection: 'User' })
export class User {
  @Prop()
  usuario: string

  @Prop()
  email: string

  @Prop()
  contrasena: string

  @Prop({ enum: Roles })
  rol: Roles

  @Prop({ type: Types.ObjectId, ref: 'Estudiante' })
  estudiante: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Docente' })
  docente: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);