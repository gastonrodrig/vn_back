import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
import { PagoStatus } from '../enums/estado-pago.enum';

export class CreatePagoDto {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  currency: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;

  @ApiProperty()
  @IsEnum(PagoStatus)
  @IsOptional()
  status?: PagoStatus;

  @ApiProperty()
  @IsString()
  @IsOptional()
  stripeOperationId?: string; 
}
