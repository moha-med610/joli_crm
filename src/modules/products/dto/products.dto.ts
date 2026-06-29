import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsMongoId()
  @IsNotEmpty()
  categoryId!: string;

  @IsString()
  @IsNotEmpty()
  productName!: string;

  @IsString()
  @IsNotEmpty()
  productDescription!: string;

  @Type(() => Number)
  @IsNotEmpty()
  productPrice!: number;

  @IsString()
  @IsNotEmpty()
  productSize!: string;
}

export class UpdateProductDto {
  @IsMongoId()
  @IsOptional()
  categoryId!: string;

  @IsString()
  @IsOptional()
  productName!: string;

  @IsString()
  @IsOptional()
  productDescription!: string;

  @Type(() => Number)
  @IsOptional()
  productPrice!: number;

  @IsString()
  @IsOptional()
  productSize!: string;
}
