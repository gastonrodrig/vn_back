import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeccionGradoPeriodoService } from './seccion-grado-periodo.service';
import { CreateSeccionGradoPeriodoDto } from './dto/create-seccion-grado-periodo.dto';
import { UpdateSeccionGradoPeriodoDto } from './dto/update-seccion-grado-periodo.dto';

@Controller('seccion-grado-periodo')
@ApiTags('Seccion-Grado-Periodo')
export class SeccionGradoPeriodoController {
  constructor(private readonly seccionGradoPeriodoService: SeccionGradoPeriodoService) {}

  @Post()
  create(@Body() createSeccionGradoPeriodoDto: CreateSeccionGradoPeriodoDto) {
    return this.seccionGradoPeriodoService.create(createSeccionGradoPeriodoDto);
  }

  @Get()
  findAll() {
    return this.seccionGradoPeriodoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seccionGradoPeriodoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSeccionGradoPeriodoDto: UpdateSeccionGradoPeriodoDto) {
    return this.seccionGradoPeriodoService.update(id, updateSeccionGradoPeriodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seccionGradoPeriodoService.remove(id);
  }

  @Get('/:gradoId/:periodoId')
  listarSeccionesPorGradoYPeriodo(
    @Param('gradoId') gradoId: string, 
    @Param('periodoId') periodoId: string
  ) {
    return this.seccionGradoPeriodoService.listarSeccionesPorGradoYPeriodo(gradoId, periodoId);
  }
}
