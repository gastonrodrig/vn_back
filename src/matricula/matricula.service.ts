import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Matricula } from './schema/matricula.schema';
import { PeriodoEscolar } from 'src/periodo-escolar/schema/periodo-escolar.schema';
import { Estudiante } from 'src/estudiante/schema/estudiante.schema';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { MetodoPago } from './enums/metodo-pago.enum';

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
    const periodo = await this.periodoModel.findById(createMatriculaDto.periodo_id);
    if (!periodo) {
      throw new BadRequestException('Periodo no encontrado');
    }
  
    const estudiante = await this.estudianteModel.findById(createMatriculaDto.estudiante_id);
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado');
    }

    const matriculaExistente = await this.matriculaModel.findOne({
      periodo: createMatriculaDto.periodo_id,
      estudiante: createMatriculaDto.estudiante_id,
    });
    if (matriculaExistente) {
      throw new BadRequestException('Ya existe una matrícula para este estudiante en el mismo periodo');
    }
  
    const n_operacion = createMatriculaDto.metodo_pago === MetodoPago.EFECTIVO ? null : createMatriculaDto.n_operacion;
  
    const matricula = new this.matriculaModel({
      monto: createMatriculaDto.monto,
      metodo_pago: createMatriculaDto.metodo_pago,
      n_operacion,  // Si es efectivo, el número de operación es null
      fecha: createMatriculaDto.fecha,
      periodo,
      estudiante,
      tipo: createMatriculaDto.tipo,
      tipoMa: createMatriculaDto.tipoMa,
    });
  
    return await matricula.save();
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
      throw new BadRequestException('Matrícula no encontrada');
    }
  
    const periodoId = new Types.ObjectId(updateMatriculaDto.periodo_id);
    const periodo = await this.periodoModel.findById(periodoId);
    if (!periodo) {
      throw new BadRequestException('Periodo no encontrado');
    }
  
    const estudianteId = new Types.ObjectId(updateMatriculaDto.estudiante_id);
    const estudiante = await this.estudianteModel.findById(estudianteId);
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado');
    }
  
    const n_operacion = updateMatriculaDto.metodo_pago === MetodoPago.EFECTIVO ? null : updateMatriculaDto.n_operacion;
  
    matricula.monto = updateMatriculaDto.monto;
    matricula.metodo_pago = updateMatriculaDto.metodo_pago;
    matricula.n_operacion = n_operacion;
    matricula.periodo = periodoId;
    matricula.estudiante = estudianteId;
  
    await matricula.save();
  
    return this.matriculaModel.findById(matricula._id)
      .populate(['estudiante', 'periodo']);
  }
  
}

