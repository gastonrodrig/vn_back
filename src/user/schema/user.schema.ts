import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Roles } from '../enum/rol.enum';
import { EstadoUsuario } from '../enum/estado-usuario.enum';

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

  @Prop({ enum: EstadoUsuario, default: EstadoUsuario.DESHABILITADO })
  estado: string;

  @Prop()
  perfil: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);