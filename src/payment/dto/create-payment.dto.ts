import {
  IsNumber,
  Min,
  Max,
  IsNotEmpty,
  IsCurrency,
  IsUUID,
} from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @Min(0.000001)
  @Max(10000)
  @IsNotEmpty()
  amount!: number;

  @IsCurrency()
  @IsNotEmpty()
  currency!: string;

  @IsUUID()
  @IsNotEmpty()
  userId!: string;
}
