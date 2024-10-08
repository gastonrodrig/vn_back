import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PensionService } from './pension.service';
import { CreatePensionDto } from './dto/create-pension.dto';
import { updatePensionDto } from './dto/update-pension.dto';
import { PagarPensionDto } from './dto/pagar-pension.dto';

@Controller('pension')
@ApiTags('Pension')
export class PensionController {
  constructor(private readonly pensionService: PensionService) {}

  @Post()
  create(@Body() createPensionDto: CreatePensionDto){
    return this.pensionService.create(createPensionDto);
  }

  @Get()
  findAll(){
    return this.pensionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pensionService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePensionDto: updatePensionDto) {
    return this.pensionService.update(id, updatePensionDto);
  }

  @Patch(':id')
  payment(@Param('id') id: string, @Body() pagarPensionDto: PagarPensionDto) {
    return this.pensionService.payment(id, pagarPensionDto);
  }
}
