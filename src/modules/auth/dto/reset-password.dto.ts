import { IsEmail, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  code: string;
}
