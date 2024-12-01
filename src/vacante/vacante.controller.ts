import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VacanteService } from './vacante.service';
import { CreateVacanteDto } from './dto/create-vacante.dto';
import { UpdateEstadoVacanteDto } from './dto/update-estado.dto';

@Controller('vacante')
@ApiTags('Vacante')
export class VacanteController {
  constructor (private readonly vacanteService: VacanteService) {}

  @Post()
  create(@Body() CreateVacanteDto: CreateVacanteDto){
    return this.vacanteService.create(CreateVacanteDto)
  }
  
  @Get()
  findAll() {
    return this.vacanteService.findAll();
  }

  @Get(':id')
  finfOne(@Param('id') id: string) {
    return this.vacanteService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string){
      return this.vacanteService.remove(id)
  }

  @Patch('change-state/:id')
  updateEstado(@Param('id') id: string, @Body() updateEstadoVacanteDto: UpdateEstadoVacanteDto) {
    return this.vacanteService.updateEstado(id, updateEstadoVacanteDto);
  }

  @Get('estudiante/:id')
  listarDocentesPorCurso(@Param('id') id: string) {
    return this.vacanteService.obtenerVacantePorEstudiante(id)
  }

  @Patch(':id/cancelar')
  async cancelarVacante(@Param('id') vacante_id: string) {
    return await this.vacanteService.cancelarVacante(vacante_id);
  }

  @Get('dashboard/conteo-actual')
  async contarVacantes(): Promise<number> {
    return await this.vacanteService.contarVacantesPorAñoActual();
  }
}
