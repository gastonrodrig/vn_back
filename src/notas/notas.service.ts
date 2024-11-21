import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Notas } from './schema/notas.schema';
import mongoose, { Model, Types } from 'mongoose';
import { Estudiante } from 'src/estudiante/schema/estudiante.schema';
import { Seccion } from 'src/seccion/schema/seccion.schema';
import { Grado } from 'src/grado/schema/grado.schema';
import { PeriodoEscolar } from 'src/periodo-escolar/schema/periodo-escolar.schema';
import { Curso } from 'src/curso/schema/curso.schema';
import { CreateNotasDto } from './dto/create-notas.dto';
import { UpdateNotasDto } from './dto/update-notas.dto';
import { Docente } from 'src/docente/schema/docente.schema';
import { Bimestre } from 'src/bimestre/schema/bimestre.schema';
import { TipoNota } from './enums/tipo-nota.enum';
import { EstadoSolicituNota } from './enums/estado-nota.enum';

@Injectable()
export class NotasService {
  constructor(
    @InjectModel(Notas.name)
    private readonly notasModel: Model<Notas>,
    @InjectModel(Estudiante.name)
    private readonly estudianteModel: Model<Estudiante>,
    @InjectModel(Docente.name)
    private readonly docenteModel: Model<Docente>,
    @InjectModel(Seccion.name)
    private readonly seccionModel: Model<Seccion>,
    @InjectModel(Grado.name)
    private readonly gradoModel: Model<Grado>,
    @InjectModel(PeriodoEscolar.name)
    private readonly periodoModel: Model<PeriodoEscolar>,
    @InjectModel(Curso.name)
    private readonly cursoModel: Model<Curso>,
    @InjectModel(Bimestre.name)
    private readonly bimestreModel: Model<Bimestre>,
  ) {}

  async create(createNotasDto: CreateNotasDto){
    const estudiante = await this.estudianteModel.findById(createNotasDto.estudiante_id)
    if(!estudiante){
      throw new BadRequestException('Estudiante no encontrado');
    }
    const docente = await this.docenteModel.findById(createNotasDto.docente_id)
    if(!docente){
      throw new BadRequestException('Docente no encontrado')
    }
    const seccion = await this.seccionModel.findById(createNotasDto.seccion_id)
    if(!seccion){
      throw new BadRequestException('Seccion no encontrada')
    }
    const grado = await this.gradoModel.findById(createNotasDto.grado_id)
    if(!grado){
      throw new BadRequestException('Grado no encontrado')
    }
    const periodo = await this.periodoModel.findById(createNotasDto.periodo_id)
    if(!periodo){
      throw new BadRequestException('Periodo no encontrado')
    }
    const curso = await this.cursoModel.findById(createNotasDto.curso_id);
    if (!curso) {
      throw new BadRequestException('Curso no encontrado');
    }
    const bimestre = await this.bimestreModel.findById(createNotasDto.bimestre_id);
    if (!bimestre) {
      throw new BadRequestException('Bimestre no encontrado');
    }

    const notas = new this.notasModel({
      estudiante,
      docente,
      seccion,
      grado,
      periodo,
      curso,
      nota: createNotasDto.nota,
      notaLetra: createNotasDto.notaLetra,
      bimestre,
      tipoNota: createNotasDto.tipoNota,
      estado: null
    })

    await notas.save()

    return this.notasModel.findById(notas._id)
      .populate(['estudiante','docente','seccion','grado','periodo','curso','bimestre'])
  }

  async findAll() {
    return await this.notasModel.find()
      .populate(['estudiante','docente','seccion','grado','periodo','curso','bimestre'])
  }

  async findOne(notas_id: string){
    return await this.notasModel.findById(notas_id)
      .populate(['estudiante','docente','seccion','grado','periodo','curso','bimestre'])
  }

  async update(notas_id: string, updateNotasDto: UpdateNotasDto) {
    const notas = await this.notasModel.findById(notas_id);
    if (!notas) {
      throw new BadRequestException('Notas no encontrada');
    }

    notas.nota = updateNotasDto.nota;
    notas.notaLetra = updateNotasDto.notaLetra;
    notas.estado = null;

    await notas.save();

    return this.notasModel.findById(notas_id)
      .populate(['estudiante', 'docente', 'seccion', 'grado', 'periodo', 'curso','bimestre']);
  }

  async remove(notas_id: string){
    const notas = await this.notasModel.findById(notas_id)
    if(!notas){
      throw new BadRequestException('Notas no encontrada')
    }
    await this.notasModel.findByIdAndDelete(notas_id)
    return { sucess: true}
  }

  async listarEstudiantesPorGradoPeriodoYSeccion(gradoId: string, periodoId: string, seccionId: string){
    const gradoObjectId = new mongoose.Types.ObjectId(gradoId);
    const periodoObjectId = new mongoose.Types.ObjectId(periodoId);
    const seccionObjectId = new mongoose.Types.ObjectId(seccionId);

    const grado = await this.gradoModel.findById(gradoObjectId);
    if(!grado){
        throw new BadRequestException('Grado no encontrado')
    }
    const periodo = await this.periodoModel.findById(periodoObjectId);
    if(!periodo){
        throw new BadRequestException('Periodo no encontrado')
    }
    const seccion = await this.seccionModel.findById(seccionObjectId);
    if(!seccion){
        throw new BadRequestException('Seccion no encontrado')
    }

    return await this.notasModel
    .find({ grado: gradoObjectId, periodo: periodoObjectId, seccion: seccionObjectId})
      .populate(['estudiante','docente','seccion','grado','periodo','curso','bimestre'])
  }

  async obtenerNota(estudiante_id: string, curso_id: string, bimestre_id: string, tipoNota: string) {
    const estudianteObjectId = new mongoose.Types.ObjectId(estudiante_id);
    const cursoObjectId = new mongoose.Types.ObjectId(curso_id);
    const bimestreObjectId = new mongoose.Types.ObjectId(bimestre_id);

    const estudiante = await this.estudianteModel.findById(estudianteObjectId);
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado');
    }

    const curso = await this.cursoModel.findById(cursoObjectId);
    if (!curso) {
      throw new BadRequestException('Curso no encontrado');
    }

    const bimestre = await this.bimestreModel.findById(bimestreObjectId);
    if (!bimestre) {
      throw new BadRequestException('Bimestre no encontrado');
    }

    const nota = await this.notasModel.findOne({
      estudiante: estudianteObjectId,
      curso: cursoObjectId,
      bimestre: bimestreObjectId,
      tipoNota: tipoNota,
    }).populate(['estudiante', 'docente', 'seccion', 'grado', 'periodo', 'curso', 'bimestre']);
  
    if (!nota) {
      throw new BadRequestException('Nota no encontrada');
    }

    return nota;
  }

  async listarNotasPorParametros(
    estudianteId: string,
    cursoId: string,
    bimestreId: string,
    seccionId: string,
    tipoNota: string,
  ) {
  
    const estudianteObjectId = new mongoose.Types.ObjectId(estudianteId);
    const cursoObjectId = new mongoose.Types.ObjectId(cursoId);
    const bimestreObjectId = new mongoose.Types.ObjectId(bimestreId);
    const seccionObjectId = new mongoose.Types.ObjectId(seccionId);
  
    // Verificar que los datos existen en la base de datos
    const estudiante = await this.estudianteModel.findById(estudianteObjectId);
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado');
    }
  
    const curso = await this.cursoModel.findById(cursoObjectId);
    if (!curso) {
      throw new BadRequestException('Curso no encontrado');
    }
  
    const bimestre = await this.bimestreModel.findById(bimestreObjectId);
    if (!bimestre) {
      throw new BadRequestException('Bimestre no encontrado');
    }
  
    const seccion = await this.seccionModel.findById(seccionObjectId);
    if (!seccion) {
      throw new BadRequestException('Sección no encontrada');
    }
  
    // Realizar la consulta para obtener las notas
    const notas = await this.notasModel.find({
      estudiante: estudianteObjectId,
      curso: cursoObjectId,
      bimestre: bimestreObjectId,
      seccion: seccionObjectId,
      tipoNota: tipoNota, // Usar directamente tipoNota
    }).populate([
      'estudiante', 'docente', 'seccion', 'grado', 'periodo', 'curso', 'bimestre',
    ]);
  
    if (notas.length === 0) {
      throw new BadRequestException('No se encontraron notas con los parámetros proporcionados');
    }
  
    return notas;
  }

  async cambiarProcesado(nota_id: string) {
    const nota = await this.notasModel.findById(nota_id)
    if (!nota) {
      throw new BadRequestException('Nota no encontrada');
    }

    nota.estado = EstadoSolicituNota.PROCESADO

    return await nota.save();
  }

  async cambiarAprobado(nota_id: string) {
    const nota = await this.notasModel.findById(nota_id)
    if (!nota) {
      throw new BadRequestException('Nota no encontrada');
    }

    nota.estado = EstadoSolicituNota.APROBADO

    return await nota.save();
  }

  async cambiarRechazado(nota_id: string) {
    const nota = await this.notasModel.findById(nota_id)
    if (!nota) {
      throw new BadRequestException('Nota no encontrada');
    }

    nota.estado = EstadoSolicituNota.RECHAZADO

    return await nota.save();
  }

  async removerEstado(nota_id: string) {
    const nota = await this.notasModel.findById(nota_id)
    if (!nota) {
      throw new BadRequestException('Nota no encontrada');
    }

    nota.estado = null

    return await nota.save();
  }
}
