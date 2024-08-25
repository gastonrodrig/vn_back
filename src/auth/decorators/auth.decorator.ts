import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from '../enums/rol.enum';
import { AuthGuard } from '../guard/auth.guard';
import { RolGuard } from '../guard/rol/rol.guard';
import { Rol } from './rol.decorator';

export function Auth(role: Roles) {
  return applyDecorators(Rol(role), UseGuards(AuthGuard, RolGuard));
}