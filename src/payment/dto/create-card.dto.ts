import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCardDto {
  @IsUUID()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  externalId!: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  last4?: string;

  @IsNumber()
  @IsNotEmpty()
  expMonth!: number;

  @IsNumber()
  @IsNotEmpty()
  expYear!: number;
}
