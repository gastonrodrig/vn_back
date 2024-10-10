import { BadRequestException, Injectable } from '@nestjs/common';
import { Vacante } from './schema/vacante.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVacanteDto } from './dto/create-vacante.dto';
import { Estudiante } from 'src/estudiante/schema/estudiante.schema';
import { Grado } from 'src/grado/schema/grado.schema';
import { PeriodoEscolar } from 'src/periodo-escolar/schema/periodo-escolar.schema';
import { UpdateEstadoVacanteDto } from './dto/update-estado.dto';
import { CuposService } from 'src/cupos/cupos.service';
import { EstadoVacante } from './enum/estado-vacante.enum';

@Injectable()
export class VacanteService {
  constructor(
    @InjectModel(Vacante.name)
    private readonly vacanteModel: Model<Vacante>,
    @InjectModel(Estudiante.name)
    private readonly estudianteModel: Model<Estudiante>,
    @InjectModel(Grado.name)
    private readonly gradoModel: Model<Grado>,
    @InjectModel(PeriodoEscolar.name)
    private readonly periodoModel: Model<PeriodoEscolar>,
    private readonly cuposService: CuposService
  ){}

  async create(createVacanteDto: CreateVacanteDto) {
    const estudiante = await this.estudianteModel.findById(createVacanteDto.estudiante_id);
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado');
    }
  
    const gradoNuevo = await this.gradoModel.findById(createVacanteDto.grado_id);
    if (!gradoNuevo) {
      throw new BadRequestException('Grado no encontrado');
    }
  
    const periodo = await this.periodoModel.findById(createVacanteDto.periodo_id);
    if (!periodo) {
      throw new BadRequestException('Periodo no encontrado');
    }
  
    // Busca la vacante más reciente del estudiante y realiza el populate del campo grado
    const vacanteMasReciente = await this.vacanteModel
      .findOne({ estudiante: estudiante._id })
      .sort({ fecha: -1 }) // Ordena por la fecha más reciente
      .populate('grado'); // Popula el campo 'grado' para obtener el objeto completo
  
    // Si el estudiante ya tiene una vacante registrada
    if (vacanteMasReciente && vacanteMasReciente.grado) {
      const gradoActual = vacanteMasReciente.grado as any; // Aseguramos que contiene los campos 'nivel' y 'nombre'
  
      // Verifica que el nuevo grado tenga un nivel superior al actual
      if (gradoNuevo.nivel <= gradoActual.nivel) {
        throw new BadRequestException(
          `El estudiante ya está registrado en un grado igual o superior (${gradoActual.nombre})`
        );
      }
    }
  
    // Verifica si ya existe una vacante para este estudiante, grado y periodo
    const vacanteExistente = await this.vacanteModel.findOne({
      estudiante: estudiante._id,
      grado: gradoNuevo._id,
      periodo: periodo._id
    });
  
    if (vacanteExistente) {
      throw new BadRequestException('Ya existe una vacante para este estudiante en este grado y periodo');
    }

    const vacanteConDiferenteGrado = await this.vacanteModel.findOne({
      estudiante: estudiante._id,
      periodo: periodo._id,
      grado: { $ne: gradoNuevo._id }, // Busca una vacante con un grado diferente
    });

    if (vacanteConDiferenteGrado) {
      throw new BadRequestException('El estudiante ya tiene una vacante en este periodo con un grado diferente');
    }
  
    // Crea la nueva vacante
    const vacante = new this.vacanteModel({
      estudiante,
      grado: gradoNuevo,
      periodo,
    });
  
    // Actualiza los cupos disponibles
    await this.cuposService.actualizarVacantes(gradoNuevo._id.toString(), periodo._id.toString(), -1);
  
    return await vacante.save();
  }
  
  async findAll(){
    return await this.vacanteModel.find()
      .populate(['estudiante','grado','periodo'])
  }

  async findOne(vacante_id: string){
    return await this.vacanteModel.findById(vacante_id)
      .populate(['estudiante','grado','periodo'])
  }

  async remove(vacante_id: string){
    const vacante = await this.vacanteModel.findById(vacante_id)
    if(!vacante){
        throw new BadRequestException('Vacante no encontrada')
    }

    await this.cuposService.actualizarVacantes(vacante.grado.toString(), vacante.periodo.toString(), 1);

    await this.vacanteModel.findByIdAndDelete(vacante_id)

    return{sucess: true}
  }

  async updateEstado(vacante_id: string, updateEstadoVacanteDto: UpdateEstadoVacanteDto) {
    const vacante = await this.vacanteModel.findById(vacante_id)
    if (!vacante) {
      throw new BadRequestException('Vacante no encontrada')
    }

    vacante.estado = updateEstadoVacanteDto.estado;
  
    await vacante.save()

    return this.vacanteModel.findById(vacante._id)
      .populate(['estudiante','grado','periodo'])
  }

  async obtenerVacantePorEstudiante(estudiante_id: string) {
    const estudiante = new Types.ObjectId(estudiante_id)
    const vacante = await this.vacanteModel.find({ estudiante: estudiante })
      .populate(['estudiante','grado','periodo'])
      
    if (vacante.length === 0) {
      throw new BadRequestException('No se encontraron vacantes para el estudiante proporcionado');
    }

    return vacante
  }

  async cancelarVacante(vacante_id: string) {
    const vacante = await this.vacanteModel.findById(vacante_id);
    if (!vacante) {
      throw new BadRequestException('Vacante no encontrada');
    }

    if (vacante.estado === EstadoVacante.CANCELADO) {
      throw new BadRequestException('La vacante ya está cancelada');
    }

    vacante.estado = EstadoVacante.CANCELADO;

    await vacante.save();

    await this.cuposService.actualizarVacantes(
      vacante.grado.toString(),
      vacante.periodo.toString(),
      1 // Liberar un cupo
    );

    return this.vacanteModel.findById(vacante._id)
      .populate(['estudiante', 'grado', 'periodo']);
  }

}
