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
import { Documento } from 'src/documento/schema/documento.schema';
import * as XLSX from 'xlsx';
import * as fs from 'fs'; // Importa el módulo fs
import * as path from 'path'; // Importa el módulo path

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
    @InjectModel(Documento.name)
    private readonly documentoModel: Model<Documento>,
  ) {}

  async create(createPensionDto: CreatePensionDto) {
    const estudiante = await this.estudianteModel.findById(
      createPensionDto.estudiante_id,
    );
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado');
    }
    const periodo = await this.periodoModel.findById(
      createPensionDto.periodo_id,
    );
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
      tiempo_pago: null,
    });
    return await pension.save();
  }

  async findAll() {
    return await this.pensionModel.find().populate(['estudiante', 'periodo']);
  }

  async findOne(pension_id: string) {
    return await this.pensionModel
      .findById(pension_id)
      .populate(['estudiante', 'periodo']);
  }

  async update(pension_id: string, updatePensionDto: updatePensionDto) {
    const pension = await this.pensionModel.findById(pension_id);
    if (!pension) {
      throw new BadRequestException('Pension no encontrada');
    }
    const estudianteId = new Types.ObjectId(updatePensionDto.estudiante_id);
    const estudiante = await this.estudianteModel.findById(estudianteId);
    if (!estudiante) {
      throw new BadRequestException('Estudiante no encontrado');
    }
    const periodoId = new Types.ObjectId(updatePensionDto.periodo_id);
    const periodo = await this.periodoModel.findById(periodoId);
    if (!periodo) {
      throw new BadRequestException('Periodo no encontrado');
    }
    pension.monto = updatePensionDto.monto;
    pension.metodo_pago = updatePensionDto.metodo_pago;
    pension.n_operacion = updatePensionDto.n_operacion;
    pension.periodo = periodoId;
    pension.fecha_inicio = new Date(updatePensionDto.fecha_inicio);
    pension.fecha_limite = new Date(updatePensionDto.fecha_limite);
    pension.estado = updatePensionDto.estado;
    pension.mes = updatePensionDto.mes;

    await pension.save();

    return this.pensionModel
      .findById(pension._id)
      .populate(['estudiante', 'periodo']);
  }

  async payment(pension_id: string, pagarPensionDto: PagarPensionDto) {
    const periodoId = new Types.ObjectId(pagarPensionDto.periodo_id);
    const pension = await this.pensionModel
      .findById(pension_id)
      .populate('estudiante');

    if (!pension) {
      throw new BadRequestException('Pensión no encontrada');
    }

    if (!pension.estudiante) {
      throw new BadRequestException('Estudiante no encontrado en la pensión');
    }

    pension.metodo_pago = pagarPensionDto.metodo_pago;
    pension.n_operacion = pagarPensionDto.n_operacion;
    pension.periodo = periodoId;
    pension.estado = EstadoPension.PAGADO;
    pension.tiempo_pago = pagarPensionDto.tiempo_pago;

    await pension.save();

    const estudiante = pension.estudiante as unknown as Estudiante & {
      _id: Types.ObjectId;
    };

    const documento = await this.documentoModel.findById(estudiante.documento);
    const tipoDocumento = documento ? documento.type : 'Dni';

    await this.pagoModel.create({
      monto: pension.monto,
      divisa: 'PEN',
      paymentMethodId: pension.metodo_pago,
      nombre_completo: `${estudiante.nombre} ${estudiante.apellido}`,
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

    return this.pensionModel
      .findById(pension._id)
      .populate(['estudiante', 'periodo']);
  }

  async findPendienteByEstudiante(estudiante_id: string) {
    const estudiante = new Types.ObjectId(estudiante_id);
    return await this.pensionModel
      .find({
        estudiante,
        estado: EstadoPension.PENDIENTE,
      })
      .populate(['estudiante', 'periodo']);
  }

  // @Cron('* * * * *')
  // async verificarPensionesVencidas() {
  //   const hoy = new Date();
  //   const limaTimeZone = 'America/Lima';

  //   const offset = getTimezoneOffset(limaTimeZone, hoy);

  //   const limaTime = new Date(hoy.getTime() + offset);

  //   const pensionesVencidas = await this.pensionModel.find({
  //     fecha_limite: { $lt: limaTime },
  //     estado: { $ne: EstadoPension.PAGADO },
  //   });

  //   for (const pension of pensionesVencidas) {
  //     pension.estado = EstadoPension.VENCIDO;
  //     await pension.save();
  //   }
  // }

  async getPensionReport() {
    const pensiones = await this.findAll();

    const reportesPorMes = {};

    pensiones.forEach((p) => {
      const mes = p.fecha_inicio.toISOString().slice(0, 7);

      if (!reportesPorMes[mes]) {
        reportesPorMes[mes] = {
          pagadas: 0,
          vencidas: 0,
        };
      }

      if (p.estado === EstadoPension.PAGADO) {
        reportesPorMes[mes].pagadas += 1;
      } else if (p.estado === EstadoPension.VENCIDO) {
        reportesPorMes[mes].vencidas += 1;
      }
    });

    const resultado = {};
    for (const mes in reportesPorMes) {
      const totalPagadas = reportesPorMes[mes].pagadas;
      const totalVencidas = reportesPorMes[mes].vencidas;
      const total = totalPagadas + totalVencidas;

      const porcentajeGanancias = total ? (totalPagadas / total) * 100 : 0;
      const porcentajePerdidas = total ? (totalVencidas / total) * 100 : 0;

      resultado[mes] = {
        pagadas: totalPagadas,
        vencidas: totalVencidas,
        porcentajeGanancias: porcentajeGanancias.toFixed(2),
        porcentajePerdidas: porcentajePerdidas.toFixed(2),
      };
    }

    return resultado;
  }

  async getPensionReportByMonth(mes: string) {
    const pensiones = await this.findAll();
    const report = this.processReportsByMonth(pensiones, mes);
    return report;
  }

  private processReportsByMonth(pensiones: any[], mes: string) {
    const pagadas = pensiones.filter(
      (p) =>
        p.estado === EstadoPension.PAGADO &&
        p.fecha_inicio.toISOString().slice(0, 7) === mes,
    );
    const vencidas = pensiones.filter(
      (p) =>
        p.estado === EstadoPension.VENCIDO &&
        p.fecha_inicio.toISOString().slice(0, 7) === mes,
    );

    const totalPagadas = pagadas.length;
    const totalVencidas = vencidas.length;
    const total = totalPagadas + totalVencidas;

    const porcentajeGanancias = total ? (totalPagadas / total) * 100 : 0;
    const porcentajePerdidas = total ? (totalVencidas / total) * 100 : 0;

    return {
      pagadas: totalPagadas,
      vencidas: totalVencidas,
      porcentajeGanancias: porcentajeGanancias.toFixed(2),
      porcentajePerdidas: porcentajePerdidas.toFixed(2),
    };
  }

  async generatePensionReportExcel(): Promise<string> {
    const reportDir = path.join(__dirname, '..', '..', 'reportes');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir);
    }

    const pensiones = await this.pensionModel.find().exec();

    const totalGanancias = pensiones.reduce((acc, pension) => acc + pension.monto, 0);
    const totalPendientes = pensiones.filter(pension => pension.estado === EstadoPension.PENDIENTE).length;
    const totalPagadas = pensiones.filter(pension => pension.estado === EstadoPension.PAGADO).length;

    const reportData = [
      {
        totalGanancias,
        totalPendientes,
        totalPagadas,
      },
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(reportData);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte de Pensiones');

    const filePath = path.join(reportDir, `reportePensionesVN_${Date.now()}.xlsx`);
    XLSX.writeFile(workbook, filePath);

    return filePath;
  }

  async findByPeriodoYEstudiante(periodo_id: string, estudiante_id: string) {
    const periodo = new Types.ObjectId(periodo_id);
    const estudiante = new Types.ObjectId(estudiante_id);
  
    const pensiones = await this.pensionModel
      .find({
        periodo,
        estudiante,
      })
      .populate(['estudiante', 'periodo']);
  
    if (!pensiones || pensiones.length === 0) {
      throw new BadRequestException('No se encontraron pensiones para el periodo y estudiante especificados');
    }
  
    return pensiones;
  }
}
