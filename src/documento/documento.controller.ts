import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DocumentoService } from './documento.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateDocumentoDto } from './dto/update-documento.dto';

@Controller('documento')
@ApiTags('Documento')
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  @Post()
  create(@Body() createDocumentoDto: CreateDocumentoDto) {
    return this.documentoService.create(createDocumentoDto);
  }

  @Get()
  findAll() {
    return this.documentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDocumentoDto: UpdateDocumentoDto) {
    return this.documentoService.update(id, updateDocumentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentoService.remove(id);
  }
}
