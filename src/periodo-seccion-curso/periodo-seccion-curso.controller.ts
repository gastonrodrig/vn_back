import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PeriodoSeccionCursoService } from './periodo-seccion-curso.service';
import { CreatePeriodoSeccionCursoDto } from './dto/create-periodo-seccion-curso.dto';
import { UpdatePeriodoSeccionCursoDto } from './dto/update-periodo-seccion-curso.dto';

@Controller('periodo-seccion-curso')
@ApiTags('periodo-seccion-curso')

export class PeriodoSeccionCursoController {
    constructor(private readonly periodoSeccionCursoService: PeriodoSeccionCursoService) {}

    @Post()
    create(@Body() createPeriodoSeccionCursoDto: CreatePeriodoSeccionCursoDto) {
      return this.periodoSeccionCursoService.create(createPeriodoSeccionCursoDto);
    }
  
    @Get()
    findAll() {
      return this.periodoSeccionCursoService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.periodoSeccionCursoService.findOne(id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updatePeriodoSeccionCursoDto: UpdatePeriodoSeccionCursoDto) {
      return this.periodoSeccionCursoService.update(id, updatePeriodoSeccionCursoDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.periodoSeccionCursoService.remove(id);
    }
  
    @Get('/:seccionId/:cursoId')
    listarPeriodoSeccionCurso(
      @Param('seccionId') seccionId: string, 
      @Param('cursoId') cursoId: string
    ) {
      return this.periodoSeccionCursoService.listarPeriodoSeccionYCurso(seccionId, cursoId);
    }

}
