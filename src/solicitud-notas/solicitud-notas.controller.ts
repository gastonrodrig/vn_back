import { Controller, Get, Post, Body, Param, Patch, Put, Delete, BadRequestException } from '@nestjs/common';
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

  @Delete('reject/:id')
  reject(@Param('id') id: string) {
    return this.solicitudNotasService.rechazarSolicitud(id);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
      return this.solicitudNotasService.eliminarSolicitud(id);
  }

  @Get('/:docenteId/:estudianteId/:cursoId/:seccionId/:bimestreId/:tipoNota')
  listarSolicitudNotasPorParametros(
    @Param('docenteId') docenteId: string,
    @Param('estudianteId') estudianteId: string,
    @Param('cursoId') cursoId: string,
    @Param('seccionId') seccionId: string,
    @Param('bimestreId') bimestreId: string,
    @Param('tipoNota') tipoNota: string,
  ) {
    return this.solicitudNotasService.listarSolicitudNotasPorParametros(
      docenteId,
      estudianteId,
      cursoId,
      seccionId,
      bimestreId,
      tipoNota,
    );
  }
}
