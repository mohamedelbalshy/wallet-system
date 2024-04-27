import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class DepositDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
