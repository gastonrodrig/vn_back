import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Curso } from 'src/curso/schema/curso.schema';
import { Grado } from 'src/grado/schema/grado.schema';
import { GradoCursoHoras } from './schema/grado-curso-horas.schema';
import { CreateGradoCursoHorasDto } from './dto/create-grado-curso-horas.dto';
import { UpdateGradoCursoHorasDto } from './dto/update-grado-curso-horas.dto';

@Injectable()
export class GradoCursoHorasService {
  constructor(
    @InjectModel(GradoCursoHoras.name)
    private readonly gradoCursoHorasModel: Model<GradoCursoHoras>,
    @InjectModel(Grado.name)
    private readonly gradoModel: Model<Grado>,
    @InjectModel(Curso.name)
    private readonly cursoModel: Model<Curso>
  ) {}

  async create(createGradoCursoHorasDto: CreateGradoCursoHorasDto) {
    const grado = await this.gradoModel.findById(createGradoCursoHorasDto.grado_id)
    if (!grado) {
      throw new BadRequestException('Grado no encontrado')
    }

    const curso = await this.cursoModel.findById(createGradoCursoHorasDto.curso_id)
    if (!curso) {
      throw new BadRequestException('Curso no encontrado')
    }

    const gradoCursoHoras = new this.gradoCursoHorasModel({
      grado,
      curso,
      horas: null
    })

    await gradoCursoHoras.save()

    return this.gradoCursoHorasModel.findById(gradoCursoHoras._id)
      .populate(['grado', 'curso'])
  }

  async findAll() {
    return await this.gradoCursoHorasModel.find()
      .populate(['grado', 'curso'])
  }

  async findOne(gradoch_id: string) {
    return await this.gradoCursoHorasModel.findById(gradoch_id)
      .populate(['grado', 'curso'])
  }

  async updateHoras(curso_id: string, grado_id: string, updateDto: UpdateGradoCursoHorasDto) {
    const gradoCursoHoras = await this.gradoCursoHorasModel.findOne({ curso: curso_id, grado: grado_id })
      .populate(['grado', 'curso']);
    if (!gradoCursoHoras) {
      throw new BadRequestException(`GradoCursosHoras not found`);
    }

    gradoCursoHoras.horas = updateDto.horas;

    await gradoCursoHoras.save()

    return this.gradoCursoHorasModel.findById(gradoCursoHoras._id)
      .populate(['grado', 'curso'])
  }

  async listarCursosPorGrado(grado_id: string) {
    const gradoCursoHoras = await this.gradoCursoHorasModel.find({ 'grado._id' : grado_id })
      .populate('curso')
    if (gradoCursoHoras.length === 0) {
      throw new BadRequestException('No se encontraron cursos para el grado proporcionado');
    }

    return gradoCursoHoras.map(e => e.curso);
  }

  async listarGradosPorCurso(cursoId: string) {
    // Asegúrate de convertir cursoId a ObjectId
    const cursoObjectId = new mongoose.Types.ObjectId(cursoId);
    
    const gradoCursosHoras = await this.gradoCursoHorasModel.find({ curso: cursoObjectId })
      .populate('grado curso', 'gradoch_id horas') // Opcional: si necesitas hacer populate
      .select('gradoch_id horas grado curso');
    
    if (gradoCursosHoras.length === 0) {
      throw new BadRequestException('No se encontraron grados para el curso proporcionado');
    }
    
    return gradoCursosHoras;
  }

  async removeByGradoAndCurso(grado_id: string, curso_id: string) {
    const gradoch = await this.gradoCursoHorasModel.findOne({ grado: grado_id, curso: curso_id })
    if (!gradoch) {
      throw new BadRequestException('La relación entre el grado y el curso no fue encontrada');
    }

    await this.gradoCursoHorasModel.findByIdAndDelete(gradoch._id)

    return { success: true };
  }

  async obtenerHorasPorCursoYGrado(curso_id: string, grado_id: string) {
    const gradoCursoHoras = await this.gradoCursoHorasModel.findOne({ curso: curso_id, grado: grado_id })
      .populate(['grado', 'curso']);
    if (!gradoCursoHoras) {
      throw new BadRequestException(`GradoCursosHoras not found`);
    }

    if (gradoCursoHoras.horas === null) {
      return 'No hay horas ingresadas';
    }

    return gradoCursoHoras.horas;
  }
}
