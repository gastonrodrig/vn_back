import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStripeDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  currency: string;
}