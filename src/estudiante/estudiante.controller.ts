import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { EstudianteService } from './estudiante.service';
import { CreateEstudianteDto } from './dto/create-estudiante.dto';
import { UpdateEstudianteDto } from './dto/update.estudiante.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Estudiante } from './schema/estudiante.schema';

@Controller('estudiante')
@ApiTags('Estudiante')
export class EstudianteController {
    constructor(
        private readonly estudianteService: EstudianteService
    ) {}

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

   @Delete(':id')
   remove(@Param('id') id: string){
    return this.estudianteService.remove(id);
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
}
