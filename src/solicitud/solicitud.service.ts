import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { UpdateEstadoSolicitudDto } from './dto/update-estado.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Solicitud } from './schema/solicitud.schema';
import { Model, Types } from 'mongoose';
import { Grado } from 'src/grado/schema/grado.schema';
import { GmailTemporalService } from 'src/gmailTemporal/gmailTemporal.service';
import { UserService } from 'src/user/user.service';
import { EstadoSolicitud } from './enums/estado-solicitud.enum';

@Injectable()
export class SolicitudService {
    //NOSE SI ESTA BIEN

  constructor(
    @InjectModel(Solicitud.name) 
    private readonly solicitudModel: Model<Solicitud>,
    @InjectModel(Grado.name)
    private readonly gradoModel: Model<Grado>,
    private readonly gmailTemporalService: GmailTemporalService,
    private readonly userService: UserService
  ) {}

  async create(createSolicitudDto: CreateSolicitudDto) {
    const grado = await this.gradoModel.findById(createSolicitudDto.grado_ID)
    if(!grado){
      throw new BadRequestException('Grado no encontrado')
    }

    const solicitud = new this.solicitudModel({
      nombre_hijo: createSolicitudDto.nombre_hijo,
      apellido_hijo: createSolicitudDto.apellido_hijo,
      dni_hijo: createSolicitudDto.dni_hijo,
      telefono_padre: createSolicitudDto.telefono_padre,
      correo_padre: createSolicitudDto.correo_padre,
      grado,
      fecha_solicitud: new Date(),
    });
    return await solicitud.save();
    }

  // Método para obtener todas las solicitudes
  async findAll(){
    return await this.solicitudModel.find()
  }

  async findOne(solicitud_id: string) {
    return await this.solicitudModel.findById(solicitud_id).populate('grado')
  }

 // Método para actualizar una solicitud por su ID
 //NO ES NECESARIO POR AHORA
 async update(solicitud_id: string, updateSolicitudDto: UpdateSolicitudDto) {
    const solicitud = await this.solicitudModel.findById(solicitud_id)
    if (!solicitud) {
      throw new BadRequestException('Solicitud no encontrada');
    }

    solicitud.nombre_hijo = updateSolicitudDto.nombre_hijo;
    solicitud.apellido_hijo = updateSolicitudDto.apellido_hijo;
    solicitud.dni_hijo = updateSolicitudDto.dni_hijo;
    solicitud.telefono_padre = updateSolicitudDto.telefono_padre;
    solicitud.correo_padre = updateSolicitudDto.correo_padre;

    return await solicitud.save();
  }
  /*
//NO ES NECESARIO POR AHORA
  async remove(solicitud_id: string) {
    const solicitudId = new Types.ObjectId(solicitud_id);
    const solicitud = await this.solicitudModel.findByIdAndDelete(solicitudId)
    if (!solicitud) {
      throw new NotFoundException(`Solicitud con ID ${solicitud_id} no encontrada`);
    }
    return solicitud;
  }*/

    async procesoSolicitud(solicitud_id: string) {
      const solicitud = await this.solicitudModel.findById(solicitud_id);
      if (!solicitud) {
        throw new NotFoundException('Solicitud no encontrada');
      }
  
      solicitud.estado = EstadoSolicitud.PROCESO;
  
      const { usuario, contrasena } = await this.userService.createTemporaryUser();
  
      await solicitud.save();
  
      await this.gmailTemporalService.sendTemporaryAccountEmail(
        solicitud.correo_padre,
        usuario,
        contrasena
      );
  
      return solicitud;
    }
}
