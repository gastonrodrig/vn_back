import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RolService } from './rol.service';
import { CreateRolDto } from './dto/create-rol.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('rol')
@ApiTags('Rol')
export class RolController {
  constructor(private readonly rolService: RolService) {}

  @Post()
  create(@Body() createRolDto: CreateRolDto) {
    return this.rolService.create(createRolDto);
  }

  @Get()
  findAll() {
    return this.rolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolService.remove(id);
  }
}
