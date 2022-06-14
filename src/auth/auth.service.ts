import { Injectable } from '@nestjs/common';
import { CompanyService } from 'src/company/company.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly companyService: CompanyService) {}

  async validateUser(email: string, password: string) {
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

  async login() {
    return 'login';
  }
}
