import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcryptjs from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Docente } from 'src/docente/schema/docente.schema';
import { Estudiante } from 'src/estudiante/schema/estudiante.schema';
import { Apoderado } from 'src/apoderado/schema/apoderado.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @InjectModel(Estudiante.name)
    private readonly estudianteModel: Model<Estudiante>,
    @InjectModel(Docente.name)
    private readonly docenteModel: Model<Docente>,
    @InjectModel(Apoderado.name)
    private readonly apoderadoModel: Model<Apoderado>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userByUsername = await this.userModel.findOne({ 
      usuario: createUserDto.usuario 
    })
    if (userByUsername) {
      throw new BadRequestException('El nombre de usuario ya está en uso.')
    }

    const userByEmail = await this.userModel.findOne({ 
      email: createUserDto.email 
    })
    if (userByEmail) {
      throw new BadRequestException('El correo electrónico ya está registrado.')
    }

    // Hashea la contraseña
    const hashedPassword = await bcryptjs.hash(createUserDto.contrasena, 10)
    // Obtén las documentos asociados, si existen
    let estudiante = null
    let docente = null
    let apoderado = null

    if(createUserDto.estudiante_id) {
      estudiante = await this.estudianteModel.findById(createUserDto.estudiante_id)
        .populate(['documento','periodo','grado','seccion','multimedia','user'])
      if (!estudiante) {
        throw new BadRequestException('Estudiante no encontrado')
      }
    }

    if (createUserDto.docente_id) {
      docente = await this.docenteModel.findById(createUserDto.docente_id)
        .populate(['documento', 'multimedia', 'user'])
      if (!docente) {
        throw new BadRequestException('Docente no encontrado')
      }
    }

    if (createUserDto.apoderado_id) {
      apoderado = await this.apoderadoModel.findById(createUserDto.apoderado_id)
        .populate(['documento','estudiante','multimedia','user'])
      if (!apoderado) {
        throw new BadRequestException('Apoderado no encontrado')
      }
    }

    const user = new this.userModel({
      ...createUserDto,
      contrasena: hashedPassword,
      estudiante: estudiante,
      docente: docente,
      apoderado: apoderado
    })

    return await user.save()
  }

  async update(user_id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(user_id)
    if (!user) {
      throw new BadRequestException('Usuario no encontrado.')
    }

    Object.assign(user, updateUserDto)

    if (updateUserDto.estudiante_id) {
      const estudianteId = new Types.ObjectId(updateUserDto.estudiante_id);
      const estudiante = await this.estudianteModel.findById(estudianteId)
        .populate(['documento','periodo','grado','seccion','multimedia','user']);
      if (!estudiante) {
        throw new BadRequestException('Docente not found');
      }

      user.estudiante = estudianteId;
    } else {
      user.estudiante = null
    }

    if (updateUserDto.docente_id) {
      const docenteId = new Types.ObjectId(updateUserDto.docente_id);
      const docente = await this.docenteModel.findById(docenteId)
        .populate(['documento', 'multimedia', 'user']);
      if (!docente) {
        throw new BadRequestException('Docente not found');
      }

      user.docente = docenteId;
    } else {
      user.docente = null
    }

    if (updateUserDto.apoderado_id) {
      const apoderadoId = new Types.ObjectId(updateUserDto.apoderado_id);
      const apoderado = await this.apoderadoModel.findById(apoderadoId)
        .populate(['documento','estudiante','multimedia','user']);
      if (!apoderado) {
        throw new BadRequestException('Docente not found');
      }

      user.apoderado = apoderadoId;
    } else {
      user.apoderado = null
    }

    return await user.save()
  }

  async findAll() {
    return await this.userModel.find()
      .populate({
        path: 'estudiante',
        strictPopulate: false,
        populate: ['documento', 'grado', 'periodo', 'seccion', 'multimedia', 'user']
      })
      .populate({
        path: 'docente',
        strictPopulate: false,
        populate: ['documento', 'multimedia', 'user']
      })
      .populate({
        path: 'apoderado',
        strictPopulate: false,
        populate: ['documento', 'estudiante', 'multimedia', 'user']
      })
  }

  async findOneById(user_id: string) {
    return await this.userModel.findById(user_id)
      .populate({
        path: 'estudiante',
        strictPopulate: false,
        populate: ['documento', 'grado', 'periodo', 'seccion', 'multimedia', 'user']
      })
      .populate({
        path: 'docente',
        strictPopulate: false,
        populate: ['documento', 'multimedia', 'user']
      })
      .populate({
        path: 'apoderado',
        strictPopulate: false,
        populate: ['documento', 'estudiante', 'multimedia', 'user']
      })
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
        path: 'estudiante',
        strictPopulate: false,
        populate: ['documento', 'grado', 'periodo', 'seccion', 'multimedia', 'user']
      })
      .populate({
        path: 'docente',
        strictPopulate: false,
        populate: ['documento', 'multimedia', 'user']
      })
      .populate({
        path: 'apoderado',
        strictPopulate: false,
        populate: ['documento', 'estudiante', 'multimedia', 'user']
      })
  }

  async remove(user_id: string) {
    const user = await this.userModel.findByIdAndDelete(user_id)
    if (!user) {
      throw new BadRequestException('Usuario no encontrado')
    }
  
    return { success: true }
  }

  async removeEstudiante(user_id: string) {
    const user = await this.userModel.findById(user_id)
    if (!user) {
      throw new BadRequestException('Usuario no encontrado')
    }

    user.estudiante = null
  
    await user.save()
    return { success: true }
  }
  
  async removeDocente(user_id: string) {
    const user = await this.userModel.findById(user_id)
    if (!user) {
      throw new BadRequestException('Usuario no encontrado')
    }

    user.docente = null
  
    await user.save()
    return { success: true }
  }

  async removeApoderado(user_id: string) {
    const user = await this.userModel.findById(user_id)
    if (!user) {
      throw new BadRequestException('Usuario no encontrado')
    }
  
    user.apoderado = null
  
    await user.save()
    return { success: true }
  }
}
