import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsUUID()
  uuid: string;

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

  @IsUUID()
  company_uuid: string;
}
