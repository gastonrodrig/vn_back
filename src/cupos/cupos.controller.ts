import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CuposService } from './cupos.service';
import { CreateCuposDto } from './dto/create-cupos.dto';
import { UpdateCuposDto } from './dto/update-curso.dto';

@Controller('cupos')
@ApiTags('Cupos')
export class CuposController {
  constructor(private readonly cuposService: CuposService) {}

  @Post()
  create(@Body() createCuposDto: CreateCuposDto) {
    return this.cuposService.create(createCuposDto);
  }

  @Get()
  findAll() {
    return this.cuposService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuposService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCuposDto: UpdateCuposDto) {
    return this.cuposService.update(id, updateCuposDto);
  }
}
