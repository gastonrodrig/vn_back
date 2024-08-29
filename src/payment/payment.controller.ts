import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  async checkout(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      // Envía el array de items al servicio
      return await this.paymentService.checkout(createPaymentDto.items);
    } catch (error) {
      // Maneja el error adecuadamente
      return { error: 'Error en el procesamiento del pago', details: error };
    }
  }
}