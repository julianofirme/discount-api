import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  value: number;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  logo: string;
}
