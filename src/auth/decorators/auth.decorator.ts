import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { RolGuard } from '../guard/rol/rol.guard';
import { Rol } from './rol.decorator';
import { Roles } from 'src/user/enum/rol.enum';

export function Auth(role: Roles) {
  return applyDecorators(Rol(role), UseGuards(AuthGuard, RolGuard));
}