import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BimestreService } from './bimestre.service';
import { CreateBimestreDto } from './dto/create-bimestre.dto';
import { UpdateBimestreDto } from './dto/update-bimestre.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('bimestre')
@ApiTags('Bimestre')
export class BimestreController {
  constructor(private readonly bimestreService: BimestreService) {}

  @Post()
  create(@Body() createBimestreDto: CreateBimestreDto) {
    return this.bimestreService.create(createBimestreDto);
  }

  @Get()
  findAll() {
    return this.bimestreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bimestreService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBimestreService: UpdateBimestreDto) {
    return this.bimestreService.update(id, updateBimestreService);
  }
}
