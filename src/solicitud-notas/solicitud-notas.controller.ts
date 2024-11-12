import { Controller, Get, Post, Body, Param, Patch, Put } from '@nestjs/common';
import { SolicitudNotasService } from './solicitud-notas.service';
import { CreateSolicitudNotasDto } from './dto/create-solicitud-notas.dto';
import { UpdateSolicitudNotasDto } from './dto/update-solicitud-notas.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('solicitud-notas')
@ApiTags('Solicitud-Notas')
export class SolicitudNotasController {
  constructor(private readonly solicitudNotasService: SolicitudNotasService) {}

  @Post()
  create(@Body() createSolicitudNotasDto: CreateSolicitudNotasDto) {
    return this.solicitudNotasService.create(createSolicitudNotasDto);
  }

  @Get()
  findAll() {
    return this.solicitudNotasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.solicitudNotasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSolicitudNotasDto: UpdateSolicitudNotasDto) {
    return this.solicitudNotasService.update(id, updateSolicitudNotasDto);
  }

  @Patch('approve/:id')
  approve(@Param('id') id: string) {
    return this.solicitudNotasService.aprobarSolicitudNotas(id);
  }

  @Patch('reject/:id')
  reject(@Param('id') id: string) {
    return this.solicitudNotasService.rechazarSolicitud(id);
  }
}
