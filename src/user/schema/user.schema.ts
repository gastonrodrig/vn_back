import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Roles } from '../enum/rol.enum';

@Schema({ collection: 'User' })
export class User {
  @Prop()
  usuario: string;

  @Prop()
  email: string;

  @Prop()
  contrasena: string;

  @Prop({ enum: Roles })
  rol: Roles;

  @Prop()
  perfil: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);