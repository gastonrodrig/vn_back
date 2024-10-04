import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEnum, IsOptional, IsNotEmpty, IsObject } from 'class-validator';
import { PagoStatus } from '../enums/estado-pago.enum';

export class CreatePagoDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  monto: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  divisa: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombre_completo: string;

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

  @ApiProperty({ type: Object })
  @IsObject()
  @IsOptional()
  metadata?: {
    tipoDocumento: string;
    nroDocumento: string;
    estudiante_id: string;
  };

  @ApiProperty()
  @IsOptional()
  paymentDate?: string;
}