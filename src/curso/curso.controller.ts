import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CursoService } from './curso.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Controller('curso')
@ApiTags('Curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post()
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursoService.create(createCursoDto);
  }

  @Get()
  findAll() {
    return this.cursoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cursoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursoService.update(id, updateCursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cursoService.remove(id);
  }
}
