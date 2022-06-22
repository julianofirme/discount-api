import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPositive,
  IsPostalCode,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { DocumentValidation } from 'src/common/validations/document';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Company name will be displayed in profile data.',
    example: 'Supermercado Logi',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Company email will be used to made login.',
    example: 'logi@mail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Company name will be displayed in profile data',
    example: 'Logi134',
  })
  @IsString()
  @MinLength(7)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({
    description: 'Company document is the CNPJ or CPF account',
    example: '12.345.678/0000-12',
  })
  @IsString()
  @Validate(DocumentValidation)
  document: string;

  @ApiProperty({
    description: 'Company address data',
    example: '45608-604',
  })
  @IsPostalCode('BR')
  @IsOptional()
  zipcode?: string;

  @ApiProperty({
    description: 'Company address data',
    example: 'SP',
  })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({
    description: 'Company address data',
    example: 'São Paulo',
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({
    description: 'Company address data',
    example: 'Avenida Padre Lourenço',
  })
  @IsString()
  @IsOptional()
  street?: string;

  @ApiProperty({
    description: 'Company address data',
    example: '4322',
  })
  @IsString()
  @IsOptional()
  @IsInt()
  @IsPositive()
  number?: string;

  @ApiProperty({
    description: 'Company address data',
    example: 'Vila Dalila',
  })
  @IsString()
  @IsOptional()
  district?: string;

  @ApiProperty({
    description: 'Company address data',
    example: '',
  })
  @IsString()
  @IsOptional()
  complement?: string;
}
