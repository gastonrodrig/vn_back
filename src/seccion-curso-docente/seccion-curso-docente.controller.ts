import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SeccionCursoDocenteService } from './seccion-curso-docente.service';
import { CreateSeccionCursoDocenteDto } from './dto/create-seccion-curso-docente.dto';
import { UpdateSeccionCursoDocenteDto } from './dto/update-seccion-curso-docente.dto';
import { ApiTags } from '@nestjs/swagger';


@Controller('seccion-curso-docente')
@ApiTags('Seccion-Curso-Docente')
export class SeccionCursoDocenteController {
    constructor(private readonly seccionCursoDocenteService: SeccionCursoDocenteService) {}

    @Post()
    create(@Body() createSeccionCursoDocenteDto: CreateSeccionCursoDocenteDto){
        return this.seccionCursoDocenteService.create(createSeccionCursoDocenteDto);
    }

    @Get()
    findAll(){
        return this.seccionCursoDocenteService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.seccionCursoDocenteService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateSeccionCursoDocenteDto: UpdateSeccionCursoDocenteDto){
        return this.seccionCursoDocenteService.update(id, updateSeccionCursoDocenteDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.seccionCursoDocenteService.remove(id);
    }

    @Get(':seccionId/:cursoId/:docenteId')
    obtenerSeccionCursoDocente(
      @Param('seccionId') seccionId: string,
      @Param('cursoId') cursoId: string,
      @Param('docenteId') docenteId: string
    ) {
        return this.seccionCursoDocenteService.obtenerSeccionCursoDocente(seccionId, cursoId, docenteId);
    }
    
    @Get('docente/:docenteId')
    obtenerSeccionesPorDocente(@Param('docenteId') docenteId: string) {
        return this.seccionCursoDocenteService.obtenerSeccionesPorDocente(docenteId);
    }
}
