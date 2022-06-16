import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as moment from 'moment';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from '../company/dto/create-company.dto';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { RecoveryDto } from './dto/recovery.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserRequest } from './models/UserRequest';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Request() req: UserRequest) {
    return this.authService.login(req.user);
  }

  @IsPublic()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  register(@Body() createCompanyDto: CreateCompanyDto) {
    return this.authService.register(createCompanyDto);
  }

  @Post('/reset-password')
  async sendRecoveryEmail(@Body() recoveryDto: RecoveryDto) {
    const company = await this.prisma.company.findFirst({
      where: { email: recoveryDto.email },
    });

    if (!company) {
      throw new HttpException('Conta não encontrada!', HttpStatus.BAD_REQUEST);
    }

    if (
      company.recovery_date &&
      moment().diff(company.recovery_date, 'minute') < 5
    )
      throw new HttpException(
        'Um email de recuperação foi enviado a menos de 5 minutos, por favor tente novamente mais tarde!',
        HttpStatus.BAD_REQUEST,
      );

    const isSuccess = await this.authService.sendRecoveryEmail(company);

    if (isSuccess) return 'Email de recuperação de senha enviado com sucesso!';

    throw new HttpException(
      'Falha ao enviar email, por favor tente novamente mais tarde',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Post('/reset-password/verify-code')
  async verifyCode(@Body() resetPasswordDto: ResetPasswordDto) {
    const company = await this.prisma.company.findFirst({
      where: { email: resetPasswordDto.email },
    });

    if (company.recovery_code !== resetPasswordDto.code)
      throw new HttpException('Link inválido!', HttpStatus.BAD_REQUEST);

    if (
      !company.recovery_code ||
      moment().diff(company.recovery_date, 'minute') > 15
    )
      throw new HttpException('Link expirado!', HttpStatus.BAD_REQUEST);

    await this.prisma.company.update({
      where: { email: resetPasswordDto.email },
      data: {
        recovery_code: null,
        recovery_date: null,
        password: await bcrypt.hash(resetPasswordDto.password, 8),
      },
    });

    return this.authService.login(company);
  }
}
