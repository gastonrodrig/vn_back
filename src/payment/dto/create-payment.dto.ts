import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CartItemDto } from './cart-item.dto';

export class CreatePaymentDto {
  @ApiProperty({ type: [CartItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  items: CartItemDto[];
}