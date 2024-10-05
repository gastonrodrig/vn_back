import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/user/enum/rol.enum';

@Injectable()export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ identificador, contrasena }: LoginDto) {
    const user = await this.userService.findOneByEmailOrUsername(identificador);
    if (!user) {
      throw new UnauthorizedException('El usuario no existe.');
    }

    const isPasswordValid = await bcryptjs.compare(contrasena, user.contrasena);
    if (!isPasswordValid) {
      throw new UnauthorizedException('La contraseña es incorrecta.');
    }

    console.log('Antes del populate:', user);

    if (user.rol === Roles.ESTUDIANTE || user.rol === Roles.TUTOR) {
      await user.populate({
        path: 'perfil',
        model: user.rol,
        populate: [
          { path: 'documento', model: 'Documento' },
          { path: 'periodo', model: 'PeriodoEscolar' },
          { path: 'grado', model: 'Grado' },
          { path: 'seccion', model: 'Seccion' },
          { path: 'multimedia', model: 'Multimedia' },
          { path: 'user', model: 'User' }
        ]
      });
    }
    
    console.log('Después del populate:', user);

    const payload = {
      email: user.email,
      rol: user.rol,
      nombres: user.usuario,
      perfil: user.perfil || null, // Si el perfil está disponible, lo incluye, si no, es null
    };

    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    return {
      token,
      email: user.email,
      rol: user.rol,
      usuario: user.usuario,
      perfil: user.perfil,
    };
  }
}
