import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEnum, IsOptional, IsNotEmpty, IsObject, IsMongoId } from 'class-validator';
import { PagoStatus } from '../enums/estado-pago.enum';

export class CreatePagoDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  monto: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  divisa?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  paymentMethodId?: string;

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
    direccion: string;
    tipoDocumento: string;
    nroDocumento: string;
  };

  @ApiProperty()
  @IsOptional()
  paymentDate?: string;
}