// src/pago/pago.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { PagoService } from './pago.service';
import { CreatePagoDto } from './dto/create-pago.dto';
import { Pago } from './schema/pago.schema';

@Controller('pago')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @Post()
  async create(@Body() createPagoDto: CreatePagoDto): Promise<Pago> {
    return this.pagoService.create(createPagoDto);
  }

  // Otros endpoints pueden ser añadidos aquí.
}