import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ApoderadoService } from './apoderado.service';
import { CreateApoderadoDto } from './dto/create-apoderado.dto';
import { UpdateApoderadoDto } from './dto/update-apoderado.dto';
import { UpdateUsuarioDto } from 'src/docente/dto/update-usuario.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Apoderado } from './schema/apoderado.schema';

@Controller('apoderado')
@ApiTags('Apoderado')
export class ApoderadoController {
  constructor(private readonly apoderadoService: ApoderadoService) {}

  @Post()
  create(@Body() createApoderadoDto: CreateApoderadoDto){
    return this.apoderadoService.create(createApoderadoDto);
  }

  @Get()
  findAll(){
    return this.apoderadoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return this.apoderadoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateApoderadoDto: UpdateApoderadoDto){
    return this.apoderadoService.update(id, updateApoderadoDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string){
    return this.apoderadoService.remove(id);
  }

  @Patch('assign-user/:id')
  assignUsuario(@Param('id') id: string, @Body() updateUserDto: UpdateUsuarioDto) {
    return this.apoderadoService.asignarUsuario(id, updateUserDto.user_id);
  }

  @Put('remove-user/:id')
  removeUsuario(@Param('id') id: string) {
    return this.apoderadoService.removeUsuario(id);
  }

  @Patch(':id/profile-picture')
  @UseInterceptors(FileInterceptor('imageFile'))
  @ApiCreatedResponse({
    description: 'Foto de perfil actualizada exitosamente.',
    type: Apoderado,
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
    return this.apoderadoService.updateProfilePicture(id, imageFile);
  }

  @Get('estudiante/:id')
  listarApoderadosPorEstudiante(@Param('id') id: string) {
    return this.apoderadoService.listarApoderadosPorEstudiante(id);
  }
}
