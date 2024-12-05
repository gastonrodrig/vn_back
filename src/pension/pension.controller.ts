import { Body, Controller, Get, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PensionService } from './pension.service';
import { CreatePensionDto } from './dto/create-pension.dto';
import { updatePensionDto } from './dto/update-pension.dto';
import { PagarPensionDto } from './dto/pagar-pension.dto';
import { Response } from 'express';

@Controller('pension')
@ApiTags('Pension')
export class PensionController {
  constructor(private readonly pensionService: PensionService) {}

  @Post()
  create(@Body() createPensionDto: CreatePensionDto){
    return this.pensionService.create(createPensionDto);
  }

  @Get()
  findAll(){
    return this.pensionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pensionService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePensionDto: updatePensionDto) {
    return this.pensionService.update(id, updatePensionDto);
  }

  @Patch(':id')
  payment(@Param('id') id: string, @Body() pagarPensionDto: PagarPensionDto) {
    return this.pensionService.payment(id, pagarPensionDto);
  }

  @Get('pendiente/:estudiante_id')
  findPendientesByEstudiante(@Param('estudiante_id') estudiante_id: string) {
  return this.pensionService.findPendienteByEstudiante(estudiante_id);
  }

  @Get('verificar/vencidas')
  verificarPensionesVencidas() {
    return this.pensionService.verificarPensionesVencidas();
  }

  @Get('reporte/pensiones')
  getPensionReport() {
    return this.pensionService.getPensionReport();
  }

  @Get('reporte/pensiones/:mes')
  async getPensionReportMes(@Param('mes') mes: string) {
    const report = await this.pensionService.getPensionReportByMonth(mes);
    return report;
  }

  @Get('reporte/excel')
  async generatePensionExcelReport(@Res() response: Response) {
    const filePath = await this.pensionService.generatePensionReportExcel();

    response.download(filePath, (err) => {
      if (err) {
        response.status(500).send('Error al descargar el archivo');
      }
    });
  }

  @Get(':periodo_id/:estudiante_id')
  async findByPeriodoYEstudiante(
    @Param('periodo_id') periodo_id: string,
    @Param('estudiante_id') estudiante_id: string,
  ) {
    return this.pensionService.findByPeriodoYEstudiante(periodo_id, estudiante_id);
  }

  @Patch('pagar/:id')
  pagarPension(@Param('id') pension_id: string) {
    return this.pensionService.updatePensionPay(pension_id);
  }
}
