import { Controller, Get, Post, Body, Param, Patch, Delete, Put } from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { UpdateEstadoSolicitudDto } from './dto/update-estado.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('solicitud')
@ApiTags('Solicitud')
export class SolicitudController {
    //LISTO
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
  //todavia no se implementa

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEstudianteDto: UpdateSolicitudDto){
  return this.solicitudService.update(id, updateEstudianteDto)
  }
/*

  @Patch(':id/estado')
  updateEstado(@Param('id') id: string, @Body() updateEstadoDto: UpdateEstadoSolicitudDto) {
    return this.solicitudService.updateEstado(id, updateEstadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.solicitudService.remove(id);
  }
  */
}
