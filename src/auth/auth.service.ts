import { Injectable } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import * as bcrypt from 'bcryptjs';
import { Company } from 'src/company/entities/company.entity';
import { CompanyPayload } from './models/CompanyPayload';
import { JwtService } from '@nestjs/jwt';
import { CompanyToken } from './models/CompanyToken';
import { CreateCompanyDto } from 'src/company/dto/create-company.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly companyService: CompanyService,
    private readonly jwtService: JwtService,
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

  async login(company: Company): Promise<CompanyToken> {
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

  async register(createCompanyDto: CreateCompanyDto) {
    const company = await this.companyService.create({
      ...createCompanyDto,
    });

    return company;
  }
}
