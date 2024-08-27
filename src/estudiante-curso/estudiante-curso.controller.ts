import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EstudianteCursoService } from './estudiante-curso.service';
import { CreateEstudianteCursoDto } from './dto/create-estudiante-curso.dto';
import { UpdateEstudianteCursoDto } from './dto/update-estudiante-curso.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('estudiante-curso')
@ApiTags('Estudiante-Curso')
export class EstudianteCursoController {
  constructor(private readonly estudianteCursoService: EstudianteCursoService) {}

  @Post()
  create(@Body() createEstudianteCursoDto: CreateEstudianteCursoDto) {
    return this.estudianteCursoService.create(createEstudianteCursoDto);
  }

  @Get()
  findAll() {
    return this.estudianteCursoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.estudianteCursoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEstudianteCursoDto: UpdateEstudianteCursoDto) {
    return this.estudianteCursoService.update(id, updateEstudianteCursoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudianteCursoService.remove(id);
  }
  
  @Get('estudiante/:id')
  listarCursosPorEstudiante(@Param('id') id:string){
    return this.estudianteCursoService.listarCursosPorEstudiante(id);
  } 
}