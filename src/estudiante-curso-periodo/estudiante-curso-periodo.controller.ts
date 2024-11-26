import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EstudianteCursoPeriodoService } from './estudiante-curso-periodo.service';
import { CreateEstudianteCursoPeriodoDto } from './dto/create-estudiante-curso-periodo.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('estudiante-curso-periodo')
@ApiTags('Estudiante-Curso-Periodo')
export class EstudianteCursoPeriodoController {
  constructor(private readonly estudianteCursoPeriodoService: EstudianteCursoPeriodoService) {}

  @Post()
  create(@Body() createEstudianteCursoPeriodoDto: CreateEstudianteCursoPeriodoDto) {
    return this.estudianteCursoPeriodoService.create(createEstudianteCursoPeriodoDto);
  }

  @Get()
  findAll() {
    return this.estudianteCursoPeriodoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudianteCursoPeriodoService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudianteCursoPeriodoService.remove(id);
  }

  @Get(':estudianteId/:periodoId')
  listarCursosPorEstudiantePeriodo(
    @Param('estudianteId') estudiante_id: string,
    @Param('periodoId') periodo_id: string,
  ){
    return this.estudianteCursoPeriodoService.listarCursosPorEstudianteCursoPeriodo(estudiante_id, periodo_id);
  } 
}