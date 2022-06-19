import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RecoveryDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
