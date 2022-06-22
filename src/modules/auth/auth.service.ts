import { Injectable } from '@nestjs/common';
import { CompanyService } from '../company/company.service';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { Company } from '../company/entities/company.entity';
import { CompanyPayload } from './models/CompanyPayload';
import { JwtService } from '@nestjs/jwt';
import { CompanyToken } from './models/CompanyToken';
import { CreateCompanyDto } from '../company/dto/create-company.dto';
import { EmailService } from '../email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly companyService: CompanyService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async validateCompany(email: string, password: string) {
    const company = await this.companyService.findByEmail(email);

    if (company) {
      const isPasswordValid = await bcrypt.compare(password, company.password);

      if (isPasswordValid) {
        return {
          ...company,
          password: undefined,
        };
      }

      throw new Error('Email ou senha incorretos.');
    }
  }

  // Company
  async loginCompany(company: Company): Promise<CompanyToken> {
    const payload: CompanyPayload = {
      sub: company.uuid,
      email: company.email,
      name: company.name,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      acess_token: jwtToken,
    };
  }

  async registerCompany(createCompanyDto: CreateCompanyDto) {
    const company = await this.companyService.create({
      ...createCompanyDto,
    });

    return company;
  }

  // Customer
  async loginCustomer(company: Company): Promise<CompanyToken> {
    const payload: CompanyPayload = {
      sub: company.uuid,
      email: company.email,
      name: company.name,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      acess_token: jwtToken,
    };
  }

  async registerCustomer(createCompanyDto: CreateCompanyDto) {
    const company = await this.companyService.create({
      ...createCompanyDto,
    });

    return company;
  }

  async sendRecoveryEmail(company: Company) {
    try {
      const code = crypto.randomUUID().split('-').join(':');
      await this.prisma.company.update({
        where: { uuid: company.uuid },
        data: { recovery_code: code, recovery_date: new Date() },
      });
      const html = this.emailService.getPasswordRecoveryEmail({
        first_name: company.name.split(' ')[0],
        url: `${this.configService.webappUrl}/app/reset-password/${code}?name=${
          company.name.split(' ')[0]
        }&email=${company.email}`,
      });
      await this.emailService.sendEmail({
        subject: 'Recuperação de senha - Sconto',
        to: company.email,
        html: html,
      });
      return true;
    } catch (err: any) {
      console.error('Failed to send password recovery email:');
      console.error(err);
      return false;
    }
  }
}
