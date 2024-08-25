import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update-estudiante.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Estudiante } from './schema/estudiante.schema';
import { UpdateSeccionDto } from './dto/update-seccion.dto';
import { UpdateEstadoEstudianteDto } from './dto/update-estado.dto';

@Controller('estudiante')
@ApiTags('Estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post()
  create(@Body() createEstudianteDto: CreateEstudianteDto){
  return this.estudianteService.create(createEstudianteDto)
  }

  @Get()
  findAll(){
  return this.estudianteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string){
  return this.estudianteService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEstudianteDto: UpdateEstudianteDto){
  return this.estudianteService.update(id, updateEstudianteDto)
  }

  @Patch('assign-seccion/:id')
  assignSeccion(@Param('id') id: string, @Body() updateSeccionDto: UpdateSeccionDto) {
    return this.estudianteService.assignSeccion(id, updateSeccionDto);
  }

  @Put('remove-seccion/:id')
  removeSeccion(@Param('id') id: string) {
    return this.estudianteService.removeSeccion(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string){
  return this.estudianteService.remove(id);
  }

  @Get('grado/:grado_id/periodo/:periodo_id')
  listarPorGradoYPeriodo(
    @Param('grado_id') grado_id: string, 
    @Param('periodo_id') periodo_id: string
  ) {
    return this.estudianteService.listarPorGradoYPeriodo(grado_id, periodo_id);
  }

  @Get('seccion/:seccion_id/grado/:grado_id/periodo/:periodo_id')
  listarPorSeccionGradoYPeriodo(
    @Param('seccion_id') seccion_id: string,
    @Param('grado_id') grado_id: string,
    @Param('periodo_id') periodo_id: string,
  ) {
    return this.estudianteService.listarPorSeccionGradoYPeriodo(seccion_id, grado_id, periodo_id);
  }

  @Patch('assign-user/:id')
  assignUsuario(@Param('id') id: string, @Body() updateUserDto: UpdateUsuarioDto) {
    return this.estudianteService.asignarUsuario(id, updateUserDto.user_id);
  }

  @Put('remove-user/:id')
  removeUsuario(@Param('id') id: string) {
    return this.estudianteService.removeUsuario(id);
  }

  @Patch(':id/profile-picture')
  @UseInterceptors(FileInterceptor('imageFile'))
  @ApiCreatedResponse({
    description: 'Foto de perfil actualizada exitosamente.',
    type: Estudiante,
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
    return this.estudianteService.updateProfilePicture(id, imageFile);
  }

  @Get(':id/profile-picture')
  getProfilePicture(@Param('id') id: string) {
    return this.estudianteService.getProfilePicture(id);
  }

  @Patch('change-state/:id')
  updateEstado(@Param('id') id: string, @Body() updateEstadoEstudianteDto: UpdateEstadoEstudianteDto) {
    return this.estudianteService.updateEstado(id, updateEstadoEstudianteDto);
  }
}
