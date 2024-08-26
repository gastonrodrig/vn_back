import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HorarioService } from './horario.service';
import { CreateHorarioDto } from './dto/create-horario.dto';

@Controller('horario')
@ApiTags('Horario')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @Post()
  create(@Body() createHorarioDto: CreateHorarioDto) {
    return this.horarioService.create(createHorarioDto);
  }

  @Get()
  findAll() {
    return this.horarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.horarioService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.horarioService.remove(id);
  }

  @Get('seccion/:seccionId/grado/:gradoId')
  findHorariosBySeccionAndGrado(
    @Param('seccionId') seccionId: string, 
    @Param('gradoId') gradoId: string
  ) {
    return this.horarioService.findHorariosBySeccionAndGrado(seccionId, gradoId);
  }

  @Get(':seccionId/:gradoId/:cursoId')
  obtenerRegistroBySeccionGradoAndCurso(
    @Param('seccionId') seccionId: string, 
    @Param('gradoId') gradoId: string, 
    @Param('cursoId') cursoId: string
  ) {
    return this.horarioService.obtenerRegistroBySeccionGradoAndCurso(seccionId, gradoId, cursoId);
  }
}
