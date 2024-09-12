import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Matricula } from './schema/matricula.schema';
import { PeriodoEscolar } from 'src/periodo-escolar/schema/periodo-escolar.schema';
import { Estudiante } from 'src/estudiante/schema/estudiante.schema';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';

@Injectable()
export class MatriculaService {
  constructor(
    @InjectModel(Matricula.name)
    private readonly matriculaModel: Model<Matricula>,
    @InjectModel(PeriodoEscolar.name)
    private readonly periodoModel: Model<PeriodoEscolar>,
    @InjectModel(Estudiante.name)
    private readonly estudianteModel: Model<Estudiante>,
  ) {}


  async create(createMatriculaDto: CreateMatriculaDto) {
    const periodo = await this.periodoModel.findById(createMatriculaDto.periodo_id)
    if (!periodo) {
      throw new BadRequestException('Periodo no encontrado')
    }

    const estudiante = await this.estudianteModel.findById(createMatriculaDto.estudiante_id)
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado')
    }

    const matricula = new this.matriculaModel({
      monto: createMatriculaDto.monto,
      metodo_pago: createMatriculaDto.metodo_pago,
      n_operacion: createMatriculaDto.n_operacion,
      fecha: new Date(),
      periodo,
      estudiante,
      tipo: createMatriculaDto.tipo,
    });
    
    return await matricula.save()

  }

  async findAll() {
    return await this.matriculaModel.find()
      .populate(['periodo', 'estudiante'])
  }

  async findOne(matricula: string) {
    return await this.matriculaModel.findById(matricula)
    .populate(['periodo', 'estudiante'])
  }

  async update(matricula_id: string, updateMatriculaDto: UpdateMatriculaDto) {
    const matricula = await this.matriculaModel.findById(matricula_id);
    if (!matricula) {
      throw new BadRequestException('Matricula no encontrado')
    }

    const periodoId = new Types.ObjectId(updateMatriculaDto.periodo_id)
    const periodo = await this.periodoModel.findById(periodoId)
    if (!periodo) {
      throw new BadRequestException('Periodo no encontrado')
    }

    const estudiateId = new Types.ObjectId(updateMatriculaDto.estudiante_id)
    const estudiante = await this.estudianteModel.findById(estudiateId)
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado')
    }

    matricula.monto = updateMatriculaDto.monto
    matricula.metodo_pago = updateMatriculaDto.metodo_pago
    matricula.n_operacion = updateMatriculaDto.n_operacion
    matricula.periodo = periodoId
    matricula.estudiante = estudiateId

    await matricula.save()

    return this.matriculaModel.findById(matricula._id)
      .populate(['estudiante', 'periodo'])
  }

}

