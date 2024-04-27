import { TrasnactionStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateTransactionDto {
  @IsUUID()
  @IsNotEmpty()
  from!: string;

  @IsUUID()
  @IsNotEmpty()
  to!: string;

  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @IsEnum(TrasnactionStatus)
  @IsNotEmpty()
  status!: TrasnactionStatus;
}
