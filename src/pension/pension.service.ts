import { BadRequestException, Injectable } from '@nestjs/common';
import { Pension } from './schema/pension.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Estudiante } from 'src/estudiante/schema/estudiante.schema';
import { CreatePensionDto } from './dto/create-pension.dto';
import { updatePensionDto } from './dto/update-pension.dto';
import { PagarPensionDto } from './dto/pagar-pension.dto';
import { EstadoPension } from './enums/estado-pension.enum';
import { Cron, CronExpression } from '@nestjs/schedule';
import { formatInTimeZone, getTimezoneOffset } from 'date-fns-tz';
import { PeriodoEscolar } from 'src/periodo-escolar/schema/periodo-escolar.schema';
import { Pago } from 'src/pago/schema/pago.schema';
import { PagoStatus } from 'src/pago/enums/estado-pago.enum';
import { Documento } from 'src/documento/schema/documento.schema'; // Importa tu esquema de Documento

@Injectable()
export class PensionService {
  constructor(
    @InjectModel(Pension.name)
    private readonly pensionModel: Model<Pension>,
    @InjectModel(PeriodoEscolar.name)
    private readonly periodoModel: Model<PeriodoEscolar>,
    @InjectModel(Estudiante.name)
    private readonly estudianteModel: Model<Estudiante>,
    @InjectModel(Pago.name)
    private readonly pagoModel: Model<Pago>,
    @InjectModel(Documento.name) // Asegúrate de tener esto
    private readonly documentoModel: Model<Documento>
  ){}

  async create(createPensionDto: CreatePensionDto){
    const estudiante = await this.estudianteModel.findById(createPensionDto.estudiante_id)
    if (!estudiante){
      throw new BadRequestException('Estudiante no encontrado')
    }
    const periodo = await this.periodoModel.findById(createPensionDto.periodo_id);
    if (!periodo) {
      throw new BadRequestException('Periodo no encontrado');
    }

    const pension = new this.pensionModel({
      estudiante,
      monto: createPensionDto.monto,
      metodo_pago: null,
      n_operacion: null,
      periodo,
      fecha_inicio: createPensionDto.fecha_inicio,
      fecha_limite: createPensionDto.fecha_limite,
      mes: createPensionDto.mes,
      tiempo_pago: null
    });
    return await pension.save()
  }
  
  async findAll(){
    return await this.pensionModel.find()
    .populate(['estudiante','periodo'])
  }

  async findOne(pension_id: string){
    return await this.pensionModel.findById(pension_id)
    .populate(['estudiante','periodo'])
  }
  
  async update(pension_id: string,updatePensionDto: updatePensionDto){
    const pension = await this.pensionModel.findById(pension_id)
    if(!pension){
      throw new BadRequestException('Pension no encontrada')
    }
    const estudianteId= new Types.ObjectId(updatePensionDto.estudiante_id)
    const estudiante = await this.estudianteModel.findById(estudianteId)
    if(!estudiante){
      throw new BadRequestException('Estudiante no encontrado')
    }
    const periodoId = new Types.ObjectId(updatePensionDto.periodo_id);
    const periodo = await this.periodoModel.findById(periodoId);
    if (!periodo) {
      throw new BadRequestException('Periodo no encontrado');
    }
    pension.monto = updatePensionDto.monto
    pension.metodo_pago = updatePensionDto.metodo_pago
    pension.n_operacion = updatePensionDto.n_operacion
    pension.periodo = periodoId;
    pension.fecha_inicio = new Date(updatePensionDto.fecha_inicio)
    pension.fecha_limite = new Date(updatePensionDto.fecha_limite)
    pension.estado = updatePensionDto.estado
    pension.mes = updatePensionDto.mes

    await pension.save()

    return this.pensionModel.findById(pension._id)
    .populate(['estudiante','periodo'])
  }

  async payment(pension_id: string, pagarPensionDto: PagarPensionDto) {
    const periodoId = new Types.ObjectId(pagarPensionDto.periodo_id);
    const pension = await this.pensionModel.findById(pension_id).populate('estudiante');
    
    if (!pension) {
      throw new BadRequestException('Pensión no encontrada');
    }
  
    // Asegúrate de que la población se haya realizado correctamente
    if (!pension.estudiante) {
      throw new BadRequestException('Estudiante no encontrado en la pensión');
    }
  
    // Actualiza la pensión
    pension.metodo_pago = pagarPensionDto.metodo_pago;
    pension.n_operacion = pagarPensionDto.n_operacion;
    pension.periodo = periodoId;
    pension.estado = EstadoPension.PAGADO;
    pension.tiempo_pago = pagarPensionDto.tiempo_pago;
  
    // Guarda los cambios en la pensión
    await pension.save();
  
    // Ahora accede a los campos del estudiante
    const estudiante = pension.estudiante as unknown as Estudiante & { _id: Types.ObjectId };

  
    const documento = await this.documentoModel.findById(estudiante.documento);
    const tipoDocumento = documento ? documento.type : 'Dni';
  
    // Crea el nuevo registro de pago
    await this.pagoModel.create({
      monto: pension.monto,
      divisa: 'PEN',
      paymentMethodId: pension.metodo_pago,
      nombre_completo: `${estudiante.nombre} ${estudiante.apellido}`, // Acceso seguro a los campos
      transactionDetails: `Pago de pensión del estudiante con ID ${estudiante._id}`,
      status: PagoStatus.APROBADO,
      stripeOperationId: pension.n_operacion,
      metadata: {
        tipoDocumento: {
          _id: documento ? documento._id : null,
          type: tipoDocumento,
          __v: documento ? documento.__v : null,
        },
        nroDocumento: estudiante.numero_documento,
        estudiante_id: estudiante._id.toString(),
      },
      paymentDate: new Date(),
    });
  
    // Devuelve la pensión actualizada
    return this.pensionModel.findById(pension._id).populate(['estudiante', 'periodo']);
  }

  async findPendienteByEstudiante(estudiante_id: string) {
    const estudiante = new Types.ObjectId(estudiante_id)
    return await this.pensionModel.find({
      estudiante,
      estado: EstadoPension.PENDIENTE
    }).populate(['estudiante','periodo']);
  }

  @Cron('* * * * *')
    async verificarPensionesVencidas() {
        const hoy = new Date();
        const limaTimeZone = 'America/Lima';

        const offset = getTimezoneOffset(limaTimeZone, hoy);
        
        const limaTime = new Date(hoy.getTime() + offset);


        const pensionesVencidas = await this.pensionModel.find({
            fecha_limite: { $lt: limaTime },
            estado: { $ne: EstadoPension.PAGADO },
        });


        for (const pension of pensionesVencidas) {
            pension.estado = EstadoPension.VENCIDO;
            await pension.save();
        }
    }
}
