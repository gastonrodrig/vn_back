import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeccionService } from './seccion.service';
import { CreateSeccionDto } from './dto/create-seccion.dto';
import { UpdateSeccionDto } from './dto/update-seccion.dto';

@Controller('seccion')
@ApiTags('Seccion')
export class SeccionController {
  constructor(private readonly seccionService: SeccionService) {}

  @Post()
  create(@Body() createSeccionDto: CreateSeccionDto) {
    return this.seccionService.create(createSeccionDto);
  }

  @Get()
  findAll() {
    return this.seccionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seccionService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSeccionDto: UpdateSeccionDto) {
    return this.seccionService.update(id, updateSeccionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seccionService.remove(id);
  }
}
