import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/user/enum/rol.enum';

export const ROLES_KEY = 'rol'
export const Rol = (rol: Roles) => SetMetadata(ROLES_KEY, rol);