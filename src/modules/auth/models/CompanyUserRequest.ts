import { Request } from 'express';
import { Company } from '../../company/entities/company.entity';

export interface CompanyUserRequest extends Request {
  user: Company;
}
