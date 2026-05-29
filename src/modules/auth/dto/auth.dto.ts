import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minSymbols: 1,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
  })
  password!: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minSymbols: 1,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
  })
  password!: string;

  @IsString()
  @IsNotEmpty()
  companyName!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsNumber()
  role!: number;
}
