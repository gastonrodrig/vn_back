// src/pago/pago.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { PagoService } from './pago.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { Pago } from './schema/pago.schema';

@Controller('pago')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @Post()
  create(@Body() createPagoDto: CreatePagoDto) {
    return this.pagoService.create(createPagoDto);
  }

  @Get()
  findAll() {
    return this.pagoService.findAll()
  }

  @Get('ganancias-mensuales')
  async getGananciasMensuales() {
    const ganancias = await this.pagoService.getGananciasPorMes();
    return ganancias;
  }
}