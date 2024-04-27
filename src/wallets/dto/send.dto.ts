import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class SendDto {
  @IsUUID()
  @IsNotEmpty()
  from!: string;

  @IsUUID()
  @IsNotEmpty()
  to!: string;

  @IsNumber()
  @IsNotEmpty()
  amount!: number;
}
