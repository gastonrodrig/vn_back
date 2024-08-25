import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

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

    const payload = { 
      email: user.email,
      rol: user.rol,
      nombres: user.usuario
    };

    // Incluir datos adicionales según el rol del usuario
    // if (user.rol === 'Estudiante' && user.estudiante) {
    //   payload.estudiante = user.estudiante;
    // }
    // if (user.rol === 'Docente' && user.docente) {
    //   payload.docente = user.docente;
    // }
    // if (user.rol === 'Apoderado' && user.apoderado) {
    //   payload.apoderado = user.apoderado;
    // }

    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    return {
      token,
      email: user.email,
      rol: user.rol,
      usuario: user.usuario,
      // docente: user.rol === 'Docente' ? user.docente : null,
      // estudiante: user.rol === 'Estudiante' ? user.estudiante : null,
      // apoderado: user.rol === 'Apoderado' ? user.apoderado : null
    };
  }
}
