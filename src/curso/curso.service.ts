import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Curso } from './schema/curso.schema';
import { Model, Types } from 'mongoose';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { GradoCursoHoras } from 'src/grado-curso-horas/schema/grado-curso-horas.schema';
import { CursoDocente } from 'src/curso-docente/schema/curso-docente.schema';

@Injectable()
export class CursoService {
  constructor(
    @InjectModel(Curso.name)
    private cursoModel: Model<Curso>,
    @InjectModel(GradoCursoHoras.name) 
    private readonly gradoCursoHorasModel: Model<GradoCursoHoras>,
    @InjectModel(CursoDocente.name) 
    private readonly cursoDocenteModel: Model<CursoDocente>
  ) {}

  async create(createCursoDto: CreateCursoDto) {
    const curso = new this.cursoModel({
      nombre: createCursoDto.nombre
    });
    return await curso.save()
  }

  async findAll() {
    return await this.cursoModel.find()
  }

  async findOne(curso_id: string) {
    return await this.cursoModel.findById(curso_id)
  }

  async update(curso_id: string, updateCursoDto: UpdateCursoDto) {
    const curso = await this.cursoModel.findById(curso_id)
    if (!curso) {
      throw new BadRequestException('Curso no encontrado')
    }

    curso.nombre = updateCursoDto.nombre

    return await curso.save()
  }

  async remove(curso_id: string) {
    const cursoId = new Types.ObjectId(curso_id)
    const curso = await this.cursoModel.findByIdAndDelete(curso_id)
    if (!curso) {
      throw new BadRequestException('Curso no encontrado')
    }

    await this.gradoCursoHorasModel.deleteMany({ curso: cursoId })
    await this.cursoDocenteModel.deleteMany({ curso: cursoId })

    return { success: true }
  }
}
