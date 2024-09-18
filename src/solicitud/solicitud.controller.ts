import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateEstadoSolicitudDto } from './dto/update-estado.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('solicitud')
@ApiTags('Solicitud')
export class SolicitudController {
  constructor(private readonly solicitudService: SolicitudService) {}

  @Post()
  create(@Body() createSolicitudDto: CreateSolicitudDto) {
    return this.solicitudService.create(createSolicitudDto);
  }

  @Get()
  findAll() {
    return this.solicitudService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudService.findOne(id);
  }

  @Patch('process/:id')
  process(@Param('id') id: string) {
    return this.solicitudService.procesarSolicitud(id)
  }

  @Patch('approve/:id')
  approve(@Param('id') id: string) {
    return this.solicitudService.aprobarSolicitud(id)
  }

  @Patch('cancel/:id')
  cancel(@Param('id') id: string){
    return this.solicitudService.cancelarSolicitud(id)
  }
}
