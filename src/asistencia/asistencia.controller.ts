import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AsistenciaService } from './asistencia.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';

@Controller('asistencia')
@ApiTags('Asistencia')
export class AsistenciaController {
  constructor(private readonly asistenciaService: AsistenciaService) {}

  @Post()
  create(@Body() createAsistenciaDto: CreateAsistenciaDto){
    return this.asistenciaService.create(createAsistenciaDto);
  }

  @Get('meses-unicos')
  async obtenerMesesUnicos(
    @Query('estudianteId') estudianteId: string,
    @Query('periodoId') periodoId: string,
  ) {
    return await this.asistenciaService.obtenerMesesUnicos(estudianteId, periodoId);
  }

  @Get()
  findAll(){
    return this.asistenciaService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAsistenciaDto: UpdateAsistenciaDto){
    return this.asistenciaService.update(id, updateAsistenciaDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.asistenciaService.remove(id)
  }

  @Get('/seccion/:seccionId')
  async listarAsistenciasPorFechaYSeccion(
    @Param('seccionId') seccionId: string,
    @Query('fecha') fecha: string
  ) {
    return await this.asistenciaService.listarAsistenciasPorFechaYSeccion(seccionId, fecha);
  }

  @Get('resumen/asistencia')
  async obtenerResumen(
    @Query('fecha') fecha: string,
    @Query('seccion_id') seccionId: string,
  ) {
    return this.asistenciaService.obtenerResumenAsistencia(fecha, seccionId);
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.asistenciaService.findOne(id);
  }

  @Delete('eliminar/:fecha/:seccionId')
  async removeAsistenciasByFechaYSeccion(
    @Query('fecha') fecha: string,
    @Query('seccionId') seccionId: string,
  ) {
    return this.asistenciaService.removeAsistenciasByFechaYSeccion(fecha, seccionId);
  }
}
