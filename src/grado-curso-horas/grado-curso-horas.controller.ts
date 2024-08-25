import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateGradoCursoHorasDto } from './dto/create-grado-curso-horas.dto';
import { UpdateGradoCursoHorasDto } from './dto/update-grado-curso-horas.dto';
import { GradoCursoHorasService } from './grado-curso-horas.service';

@Controller('grado-curso-horas')
@ApiTags('Grado-Cursos-Horas')
export class GradoCursoHorasController {
  constructor(private readonly gradoCursoHorasService: GradoCursoHorasService) {}

  @Post()
  create(@Body() createGradoCursoHorasDto: CreateGradoCursoHorasDto) {
    return this.gradoCursoHorasService.create(createGradoCursoHorasDto);
  }

  @Get()
  findAll() {
    return this.gradoCursoHorasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradoCursoHorasService.findOne(id);
  }

  @Patch(':gradoId/:cursoId')
  async updateHoras(
    @Param('gradoId') gradoId: string,
    @Param('cursoId') cursoId: string,
    @Body() updateDto: UpdateGradoCursoHorasDto,
  ) {
    return this.gradoCursoHorasService.updateHoras(cursoId, gradoId, updateDto);
  }

  @Get('grado/:id')
  listarCursosPorGrado(@Param('id') id: string) {
    return this.gradoCursoHorasService.listarCursosPorGrado(id);
  }

  @Get('curso/:id')
  listarGradosPorCurso(@Param('id') id: string) {
    return this.gradoCursoHorasService.listarGradosPorCurso(id);
  }

  @Delete(':gradoId/:cursoId')
  removeGradoCurso(@Param('gradoId') grado_id: string, @Param('cursoId') curso_id: string) {
    return this.gradoCursoHorasService.removeByGradoAndCurso(grado_id, curso_id);
  }

  @Get(':cursoId/:gradoId')
  obtenerHoras(@Param('cursoId') cursoId: string, @Param('gradoId') gradoId: string) {
    return this.gradoCursoHorasService.obtenerHorasPorCursoYGrado(cursoId, gradoId);
  }
}
