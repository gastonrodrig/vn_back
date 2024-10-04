import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SemanasService } from './semanas.service';
import { CreateSemanasDto } from './dto/create-semanas.dto';
import { UpdateSemanasDto } from './dto/update-semanas.dto';
@Controller('semanas')
@ApiTags('Semanas')

export class SemanasController {
    constructor(private readonly semanasService: SemanasService) {}

    @Post()
    create(@Body() createSemanasDto: CreateSemanasDto) {
      return this.semanasService.create(createSemanasDto);
    }
  
    @Get()
    findAll() {
      return this.semanasService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.semanasService.findOne(id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateSemanasDto: UpdateSemanasDto) {
      return this.semanasService.update(id, updateSemanasDto);
    }


}
