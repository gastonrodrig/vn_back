import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeccionCursoService } from './seccion-curso.service';
import { CreateSeccionCursoDto } from './dto/create-seccion-curso.dto';
import { UpdateSeccionCursoDto } from './dto/update-seccion-curso.dto';

@Controller('seccion-curso')
@ApiTags('Seccion-Curso')

export class SeccionCursoController {
    constructor(private readonly seccionCursoService: SeccionCursoService) {}

    @Post()
    create(@Body() createSeccionCursoDto: CreateSeccionCursoDto) {
      return this.seccionCursoService.create(createSeccionCursoDto);
    }
  
    @Get()
    findAll() {
      return this.seccionCursoService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.seccionCursoService.findOne(id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateSeccionCursoDto: UpdateSeccionCursoDto) {
      return this.seccionCursoService.update(id, updateSeccionCursoDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.seccionCursoService.remove(id);
    }
  
    // @Get('/:seccionId/:periodoId')
    // listarPeriodoSeccionCurso(
    //   @Param('seccionId') seccionId: string, 
    //   @Param('periodoId') periodoId: string
    // ) {
    //   return this.periodoSeccionCursoService.listarCursoSeccionyPeriodo(seccionId, periodoId);
    // }

}
