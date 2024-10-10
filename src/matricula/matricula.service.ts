import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Matricula } from './schema/matricula.schema';
import { PeriodoEscolar } from 'src/periodo-escolar/schema/periodo-escolar.schema';
import { Estudiante } from 'src/estudiante/schema/estudiante.schema';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';
import { MetodoPago } from './enums/metodo-pago.enum';
import { EstadoVacante } from 'src/vacante/enum/estado-vacante.enum';
import { Vacante } from 'src/vacante/schema/vacante.schema';

@Injectable()
export class MatriculaService {
  constructor(
    @InjectModel(Matricula.name)
    private readonly matriculaModel: Model<Matricula>,
    @InjectModel(PeriodoEscolar.name)
    private readonly periodoModel: Model<PeriodoEscolar>,
    @InjectModel(Estudiante.name)
    private readonly estudianteModel: Model<Estudiante>,
    @InjectModel(Vacante.name)
    private readonly vacanteModel: Model<Vacante>
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
      periodo: new Types.ObjectId(createMatriculaDto.periodo_id),
      estudiante: new Types.ObjectId(createMatriculaDto.estudiante_id),
    });

    if (matriculaExistente) {
      throw new BadRequestException('Ya existe una matrícula para este estudiante en el mismo periodo');
    }

    const vacanteReservada = await this.vacanteModel.findOne({
      estudiante: estudiante._id,
      periodo: periodo._id,
    });
  
    if (!vacanteReservada) {
      throw new BadRequestException('Este estudiante no cuenta con vacante.');
    }
 
    if (vacanteReservada.estado !== EstadoVacante.RESERVADO) {
      throw new BadRequestException('El estado de la vacante no permite la matrícula.');
    }
  
    vacanteReservada.estado = EstadoVacante.CONFIRMADO;

    await vacanteReservada.save();
  
    const matricula = new this.matriculaModel({
      monto: createMatriculaDto.monto,
      metodo_pago: createMatriculaDto.metodo_pago,
      n_operacion: createMatriculaDto.n_operacion,
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
  
    matricula.monto = updateMatriculaDto.monto;
    matricula.metodo_pago = updateMatriculaDto.metodo_pago;
    matricula.n_operacion = updateMatriculaDto.n_operacion;
    matricula.periodo = periodoId;
    matricula.estudiante = estudianteId;
  
    await matricula.save();
  
    return this.matriculaModel.findById(matricula._id)
      .populate(['estudiante', 'periodo']);
  }

  async listerMatriculasPorEstudiante(estudiante_id: string){
    const estudianteId = new Types.ObjectId(estudiante_id);
    const estudiante = await this.estudianteModel.findById(estudianteId)
    if(!estudiante){
      throw new BadRequestException('Estudiante no encontrado')
    }

    return this.matriculaModel.find({ estudiante: estudiante._id })
      .populate(['estudiante', 'periodo'])
  }
  
}

