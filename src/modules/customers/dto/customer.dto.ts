import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('EG')
  phone!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber('EG')
  whatsapp!: string;

  @IsString()
  @IsOptional()
  notes!: string;
}

export class UpdateCustomerDto {
  @IsString()
  @IsOptional()
  name!: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber('EG')
  phone!: string;

  @IsString()
  @IsOptional()
  address!: string;

  @IsString()
  @IsOptional()
  city!: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber('EG')
  whatsapp?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
