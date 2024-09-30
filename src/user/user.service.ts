import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Model, Types } from 'mongoose'
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Estudiante } from 'src/estudiante/schema/estudiante.schema';
import { Tutor } from 'src/tutor/schema/tutor.schema';
import { Roles } from './enum/rol.enum';
import * as bcryptjs from 'bcryptjs';
import * as crypto from 'crypto';
import { EstadoUsuario } from './enum/estado-usuario.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Estudiante.name)
    private readonly estudianteModel: Model<Estudiante>,
    @InjectModel(Tutor.name)
    private readonly tutorModel: Model<Tutor>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userByUsername = await this.userModel.findOne({
      usuario: createUserDto.usuario
    });
    if(userByUsername) {
      throw new BadRequestException('El nombre de usuario ya está en uso.')
    }

    const userByEmail = await this.userModel.findOne({
      email: createUserDto.email
    });
    if(userByEmail) {
      throw new BadRequestException('El correo electrónico ya está registrado.')
    }

    const hashedPassword = await bcryptjs.hash(createUserDto.contrasena, 10);

    let perfil = null

    if(createUserDto.perfil_id) {
      if(createUserDto.rol === 'Estudiante') {
        perfil = await this.estudianteModel.findById(createUserDto.perfil_id)
        if(!perfil) {
          throw new BadRequestException('Estudiante no encontrado')
        }  
      } 
      if(createUserDto.rol === 'Tutor') {
        perfil = await this.estudianteModel.findById(createUserDto.perfil_id)
        if(!perfil) {
          throw new BadRequestException('Tutor no encontrado')
        }  
      } 
    }

    const user = new this.userModel({
      ...createUserDto,
      contrasena: hashedPassword,
      perfil: perfil ? perfil._id : null
    })

    return await user.save()
  }

  async findAll() {
    return await this.userModel.find()
  }

  async findOneById(user_id: string) {
    return await this.userModel.findById(user_id)
  }

  async update(user_id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(user_id)
    if (!user) {
      throw new BadRequestException('Usuario no encontrado.')
    }
  
    Object.assign(user, updateUserDto)
  
    if (updateUserDto.rol === 'Estudiante') {
      if (updateUserDto.perfil_id) {
        const estudianteId = new Types.ObjectId(updateUserDto.perfil_id)
        const estudiante = await this.estudianteModel.findById(estudianteId)
        if (!estudiante) {
          throw new BadRequestException('Estudiante no encontrado.')
        }
        user.perfil = estudianteId
      } else {
        user.perfil = null
      }
  
    } else if (updateUserDto.rol === 'Tutor') {
      if (updateUserDto.perfil_id) {
        const tutorId = new Types.ObjectId(updateUserDto.perfil_id)
        const tutor = await this.tutorModel.findById(tutorId)
          .populate(['documento', 'multimedia', 'user'])
        if (!tutor) {
          throw new BadRequestException('Tutor no encontrado.')
        }
        user.perfil = tutorId
      } else {
        user.perfil = null
      }
    }
  
    return await user.save()
  }

  async changePassword(user_id: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.userModel.findById(user_id)
    if (!user) {
      throw new BadRequestException('Usuario no encontrado')
    }
  
    const hashedPassword = await bcryptjs.hash(changePasswordDto.newPassword, 10)
    user.contrasena = hashedPassword
  
    await user.save()

    return { success: true }
  }

  async findOneByEmailOrUsername(identifier: string) {
    const isEmail = identifier.includes('@')
  
    const filter = isEmail ? { email: identifier } : { usuario: identifier }
  
    return await this.userModel.findOne(filter)
      .populate({
        path: 'perfil',
        strictPopulate: false,
        populate: ['documento', 'grado', 'periodo', 'seccion', 'multimedia', 'user']
      })
  }

  async remove(user_id: string) {
    const user = await this.userModel.findByIdAndDelete(user_id)
    if (!user) {
      throw new BadRequestException('Usuario no encontrado')
    }
  
    return { success: true }
  }

  async cambiarHabilitado(user_id: string){
    const user = await this.userModel.findById(user_id);
    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    user.estado = EstadoUsuario.HABILITADO;

    return await user.save();
  }

  async cambiarDeshabilitado(user_id: string){
    const user = await this.userModel.findById(user_id);
    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }

    user.estado = EstadoUsuario.DESHABILITADO;

    return await user.save();
  }

  async createTemporaryUser() {
    const randomUsername = await this.generateUniqueUsername()
    const randomPassword = this.generateRandomString(12)

    const hashedPassword = await bcryptjs.hash(randomPassword, 10)

    const newUser = new this.userModel({
      usuario: randomUsername,
      contrasena: hashedPassword,
      email: `${randomUsername}@temporal.com`,
      rol: Roles.TEMPORAL,
    })

    await newUser.save()

    return {
      usuario: randomUsername,
      contrasena: randomPassword,
      rol: newUser.rol,
    }
  }

  async generateUniqueUsername() {
    let username: string
    let userExists = true

    do {
      username = this.generateRandomString(8)
      const existingUser = await this.userModel.findOne({ usuario: username })
      if (!existingUser) {
        userExists = false
      }
    } while (userExists)

    return username
  }

  generateRandomString(length: number) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)
  }
}
