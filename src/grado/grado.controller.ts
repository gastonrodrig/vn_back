import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GradoService } from './grado.service';
import { CreateGradoDto } from './dto/create-grado.dto';
import { UpdateGradoDto } from './dto/update-grado.dto';

@Controller('grado')
@ApiTags('Grado')
export class GradoController {
  constructor(private readonly gradoService: GradoService) {}

  @Post()
  create(@Body() createGradoDto: CreateGradoDto) {
    return this.gradoService.create(createGradoDto);
  }

  @Get()
  findAll() {
    return this.gradoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGradoDto: UpdateGradoDto) {
    return this.gradoService.update(id, updateGradoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradoService.remove(id);
  }
}
