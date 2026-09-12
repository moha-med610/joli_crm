import { Optional } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('EG')
  phone!: string;

  @IsString()
  @IsNotEmpty()
  companyName!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsString()
  @IsNotEmpty()
  city!: string;
}

export class UpdateCompanyDto {
  @IsString()
  @Optional()
  companyName?: string;

  @IsString()
  @IsPhoneNumber('EG')
  @Optional()
  phone?: string;

  @IsString()
  @Optional()
  address?: string;

  @IsString()
  @Optional()
  city?: string;
}