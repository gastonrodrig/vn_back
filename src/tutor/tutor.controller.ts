import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { TutorService } from './tutor.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Tutor } from './schema/tutor.schema';
import { UpdateTutorDto } from './dto/update-tutor.dto';

@Controller('tutor')
@ApiTags('Tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Post()
  create(@Body() createTutorDto: CreateTutorDto){
    return this.tutorService.create(createTutorDto)
  }

  @Get()
  findAll() {
    return this.tutorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tutorService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() UpdateTutorDto: UpdateTutorDto){
  return this.tutorService.update(id, UpdateTutorDto)
  }

  @Get('seccion/:seccion_id/grado/:grado_id/periodo/:periodo_id')
  listarPorSeccionGradoYPeriodo(
    @Param('seccion_id') seccion_id: string,
    @Param('grado_id') grado_id: string,
    @Param('periodo_id') periodo_id: string,
  ) {
    return this.tutorService.listarPorSeccionGradoYPeriodo(seccion_id, grado_id, periodo_id);
  }

  @Patch('assign-user/:id')
  assignUsuario(@Param('id') id: string, @Body() updateUserDto: UpdateUsuarioDto) {
    return this.tutorService.asignarUsuario(id, updateUserDto.user_id);
  }

  @Put('remove-user/:id')
  removeUsuario(@Param('id') id: string) {
    return this.tutorService.removeUsuario(id);
  }

  @Patch(':id/profile-picture')
  @UseInterceptors(FileInterceptor('imageFile'))
  @ApiCreatedResponse({
    description: 'Foto de perfil actualizada exitosamente.',
    type: Tutor,
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
    return this.tutorService.updateProfilePicture(id, imageFile);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tutorService.remove(id); 
  }

  @Get('documento/:numero_documento')
  getTutorByNumeroDocumento(
    @Param('numero_documento') numero_documento: string,
    @Query('validarUsuarioAsignado') validarUsuarioAsignado: string
  ) {
    const validar = validarUsuarioAsignado === 'true'
    return this.tutorService.findByNumeroDocumento(numero_documento, validar)
  }
}
