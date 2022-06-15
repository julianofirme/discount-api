import {
  IsEmail,
  IsOptional,
  IsPostalCode,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { DocumentValidation } from 'src/common/validations/document';

export class CreateCompanyDto {
  @IsUUID()
  uuid: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(7)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  @Validate(DocumentValidation)
  document: string;

  @IsPostalCode('BR')
  @IsOptional()
  zipcode?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  number?: string;

  @IsString()
  @IsOptional()
  district?: string;

  @IsString()
  @IsOptional()
  complement?: string;
}
