import { Type } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPositive,
  IsPostalCode,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { DocumentValidation } from 'src/common/validations/document';

export class CreateCustomerDto {
  @ApiProperty({
    description: 'Customer name will be displayed in profile data.',
    example: 'Supermercado Logi',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Customer email will be used to made login.',
    example: 'logi@mail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Customer name will be displayed in profile data',
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
    description: 'Customer document is the CPF account',
    example: '123.456.789-00',
  })
  @IsString()
  @Validate(DocumentValidation)
  document: string;

  @IsString()
  type: Type;

  @IsString()
  @IsUrl()
  profile_pic: string;

  @ApiProperty({
    description: 'Customer address data',
    example: '45608-604',
  })
  @IsPostalCode('BR')
  @IsOptional()
  zipcode?: string;

  @ApiProperty({
    description: 'Customer address data',
    example: 'SP',
  })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({
    description: 'Customer address data',
    example: 'São Paulo',
  })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({
    description: 'Customer address data',
    example: 'Avenida Padre Lourenço',
  })
  @IsString()
  @IsOptional()
  street?: string;

  @ApiProperty({
    description: 'Customer address data',
    example: '4322',
  })
  @IsString()
  @IsOptional()
  @IsInt()
  @IsPositive()
  number?: string;

  @ApiProperty({
    description: 'Customer address data',
    example: 'Vila Dalila',
  })
  @IsString()
  @IsOptional()
  district?: string;

  @ApiProperty({
    description: 'Customer address data',
    example: '',
  })
  @IsString()
  @IsOptional()
  complement?: string;
}
