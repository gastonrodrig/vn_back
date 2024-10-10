import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { DocenteService } from './docente.service';
import { CreateDocenteDto } from './dto/create-docente.dto';
import { UpdateDocenteDto } from './dto/update-docente.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Docente } from './schema/docente.schema';

@Controller('docente')
@ApiTags('Docente')
export class DocenteController {
  constructor(private readonly docenteService: DocenteService) {}

  @Post()
  create(@Body() createDocenteDto: CreateDocenteDto) {
    return this.docenteService.create(createDocenteDto);
  }

  @Get()
  findAll() {
    return this.docenteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.docenteService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDocenteDto: UpdateDocenteDto) {
    return this.docenteService.update(id, updateDocenteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.docenteService.remove(id);
  }

  @Patch('assign-user/:id')
  assignUsuario(@Param('id') id: string, @Body() updateUserDto: UpdateUsuarioDto) {
    return this.docenteService.asignarUsuario(id, updateUserDto.user_id);
  }

  @Put('remove-user/:id')
  removeUsuario(@Param('id') id: string) {
    return this.docenteService.removeUsuario(id);
  }

  @Patch(':id/profile-picture')
  @UseInterceptors(FileInterceptor('imageFile'))
  @ApiCreatedResponse({
    description: 'Foto de perfil actualizada exitosamente.',
    type: Docente,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        imageFile: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  updateProfilePicture(
    @Param('id') id: string,
    @UploadedFile() imageFile: Express.Multer.File
  ) {
    return this.docenteService.updateProfilePicture(id, imageFile);
  }

  @Get('documento/:numero_documento')
  getDocenteByNumeroDocumento(
    @Param('numero_documento') numero_documento: string,
    @Query('validarUsuarioAsignado') validarUsuarioAsignado: string
  ) {
    const validar = validarUsuarioAsignado === 'true'
    return this.docenteService.findByNumeroDocumento(numero_documento, validar)
  }
}

