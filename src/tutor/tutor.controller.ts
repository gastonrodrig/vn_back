import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TutorService } from './tutor.service';
import { CreateTutorDto } from './dto/create-tutor.dto';

@Controller('tutor')
@ApiTags('Tutor')
export class TutorController {
    constructor(private readonly tutorService: TutorService) {}

    @Post()
    create(@Body() createTutorDto: CreateTutorDto){
        return this.tutorService.create(createTutorDto)
    }
}
