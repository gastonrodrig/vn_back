import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CursoDocenteService } from './curso-docente.service';
import { CreateCursoDocenteDto } from './dto/create-curso-docente.dto';
import { UpdateCursoDocenteDto } from './dto/update-curso-docente.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('curso-docente')
@ApiTags('Curso-Docente')
export class CursoDocenteController {
  constructor(private readonly cursoDocenteService: CursoDocenteService) {}

  @Post()
  create(@Body() createCursoDocenteDto: CreateCursoDocenteDto) {
    return this.cursoDocenteService.create(createCursoDocenteDto);
  }

  @Get()
  findAll() {
    return this.cursoDocenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursoDocenteService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCursoDocenteDto: UpdateCursoDocenteDto) {
    return this.cursoDocenteService.update(id, updateCursoDocenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursoDocenteService.remove(id);
  }
}
