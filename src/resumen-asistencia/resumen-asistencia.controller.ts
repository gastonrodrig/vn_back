import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResumenAsistenciaService } from './resumen-asistencia.service';
import { CreateResumenAsistenciaDto } from './dto/create-resumen-asistencia.dto';
import { UpdateResumenAsistenciaDto } from './dto/update-resumen-asistencia.dto';

@Controller('resumen-asistencia')
@ApiTags('Resumen-Asistencia')
export class ResumenAsistenciaController {
    constructor(private readonly resumenAsistenciaService: ResumenAsistenciaService) {}

    @Post()
    create(@Body() createResumenAsistenciaDto: CreateResumenAsistenciaDto){
        return this.resumenAsistenciaService.create(createResumenAsistenciaDto);
    }

    @Get()
    findAll(){
        return this.resumenAsistenciaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.resumenAsistenciaService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateResumenAsistenciaDto: UpdateResumenAsistenciaDto){
        return this.resumenAsistenciaService.update(id, updateResumenAsistenciaDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.resumenAsistenciaService.remove(id);
    }

    @Get('seccion/:id')
    listarResumenAsistenciaPorSeccion(@Param('id') id: string){
        return this.resumenAsistenciaService.listarResumenAsistenciaPorSeccion(id);
    }
}
