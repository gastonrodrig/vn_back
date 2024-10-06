import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PeriodoEscolarService } from './periodo-escolar.service';
import { CreatePeriodoEscolarDto } from './dto/create-periodo-escolar.dto';
import { UpdatePeriodoEscolarDto } from './dto/update-periodo-escolar.dto';

@Controller('periodo-escolar')
@ApiTags('Periodo-Escolar')
export class PeriodoEscolarController {
  constructor(private readonly periodoEscolarService: PeriodoEscolarService) {}

  @Post()
  create(@Body() createPeriodoEscolarDto: CreatePeriodoEscolarDto) {
    return this.periodoEscolarService.create(createPeriodoEscolarDto);
  }

  @Get()
  findAll() {
    return this.periodoEscolarService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.periodoEscolarService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePeriodoEscolarDto: UpdatePeriodoEscolarDto) {
    return this.periodoEscolarService.update(id, updatePeriodoEscolarDto);
  }
  @Get('anio/:anio')
  findByAnio(@Param('anio') anio: string) {
    return this.periodoEscolarService.findByAnio(anio);
  }
}
