import { Body, Controller, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { TareasService } from './tareas.service';
import { CreateTareasDto } from './dto/create-tareas.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UpdateTareasDto } from './dto/update-tareas.dto';

@Controller('tareas')
@ApiTags('Tareas')
export class TareasController {
    constructor(private readonly tareasService: TareasService) {}

    @Post()
    @UseInterceptors(FilesInterceptor('files'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                estudiante_id: { type: 'string', format: 'uuid' },
                curso_id: { type: 'string', format: 'uuid' },
                files: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                },
            },
            required: ['estudiante_id', 'curso_id', 'files'],
        },
    })
    async create(@Body() createTareasDto: CreateTareasDto, @UploadedFiles() files: Express.Multer.File[]) {
        return this.tareasService.create(createTareasDto, files);
    }

    @Get()
    findAll(){
        return this.tareasService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.tareasService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateTareasDto: UpdateTareasDto){
        return this.tareasService.update(id, updateTareasDto)
    }

    @Put('assign-files/:id')
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
    updateFiles(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    ) {
        return this.tareasService.updateFiles(id, files);
    }

    
}
