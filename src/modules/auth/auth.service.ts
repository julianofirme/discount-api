import { Injectable } from '@nestjs/common';
import { CompanyService } from '../company/company.service';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { Company } from '../company/entities/company.entity';
import { AuthPayload } from './models/AuthPayload';
import { JwtService } from '@nestjs/jwt';
import { AuthToken } from './models/AuthToken';
import { CreateCompanyDto } from '../company/dto/create-company.dto';
import { EmailService } from '../email/email.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from 'src/config/config.service';
import { CustomerService } from '../customer/customer.service';
import { CreateCustomerDto } from '../customer/dto/create-customer.dto';
import { Customer } from '../customer/entities/customer.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly companyService: CompanyService,
    private readonly customerService: CustomerService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string) {
    const company = await this.companyService.findByEmail(email);
    const customer = await this.customerService.findByEmail(email);

    if (company && !customer) {
      const isPasswordValid = await bcrypt.compare(password, company.password);

      if (isPasswordValid) {
        return {
          ...company,
          password: undefined,
        };
      }

      throw new Error('Email ou senha incorretos.');
    }

    if (!company && customer) {
      const isPasswordValid = await bcrypt.compare(password, customer.password);

      if (isPasswordValid) {
        return {
          ...customer,
          password: undefined,
        };
      }

      throw new Error('Email ou senha incorretos.');
    }
  }

  // Company
  async loginCompany(company: Company): Promise<AuthToken> {
    const payload: AuthPayload = {
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
      type: 'COMPANY',
    });

    return company;
  }

  // Customer
  async loginCustomer(customer: Customer): Promise<AuthToken> {
    const payload: AuthPayload = {
      sub: customer.uuid,
      email: customer.email,
      name: customer.name,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      acess_token: jwtToken,
    };
  }

  async registerCustomer(createCustomerDto: CreateCustomerDto) {
    const company = await this.customerService.create({
      ...createCustomerDto,
      type: 'CUSTOMER',
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
