import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
import { PagoStatus } from '../enums/estado-pago.enum';

export class CreatePagoDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  currency: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  transactionDetails?: any;

  @ApiProperty()
  @IsEnum(PagoStatus)
  @IsOptional()
  status?: PagoStatus;

  @ApiProperty()
  @IsString()
  @IsOptional()
  stripeOperationId?: string; 
}
