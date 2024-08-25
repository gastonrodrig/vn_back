import { SetMetadata } from '@nestjs/common';
import { Roles } from '../enums/rol.enum';

export const ROLES_KEY = 'rol'
export const Rol = (rol: Roles) => SetMetadata(ROLES_KEY, rol);