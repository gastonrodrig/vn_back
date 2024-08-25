import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { DocumentosEstudianteService } from './documentos-estudiante.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateDocumentosEstudianteDto } from './dto/create-documentos-estudiante.dto';
import { DocumentosEstudiante } from './schema/documentos-estudiante.schema';

@Controller('documentos-estudiante')
@ApiTags('Documentos-Estudiante')
export class DocumentosEstudianteController {
  constructor(private readonly documentosEstudianteService: DocumentosEstudianteService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
          example: ['file1.jpg', 'file2.jpg'],
        },
        estudiante_id: { type: 'string' },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'El registro ha sido creado exitosamente.',
    type: DocumentosEstudiante,
  })
  create(
    @Body() createDocumentosEstudianteDto: CreateDocumentosEstudianteDto, 
    @UploadedFiles() files: Express.Multer.File[]
  ) {
    return this.documentosEstudianteService.create(createDocumentosEstudianteDto, files);
  }

  @Get()
  findAll() {
    return this.documentosEstudianteService.findAll();
  }

  @Get(':estudianteId')
  findOne(@Param('estudianteId') id: string) {
    return this.documentosEstudianteService.findOne(id);
  }

  @Put(':estudianteId')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'El registro ha sido actualizado exitosamente.',
    type: DocumentosEstudiante,
  })
  update(
    @Param('estudianteId') estudianteId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.documentosEstudianteService.update(estudianteId, files);
  }

  @Delete(':estudianteId')
  remove(@Param('estudianteId') id: string) {
    return this.documentosEstudianteService.remove(id);
  }

  @Get('estudiante/:estudianteId')
  listarDocumentosPorEstudiante(@Param('estudianteId') id: string) {
    return this.documentosEstudianteService.listarDocumentosPorEstudiante(id);
  }
}
