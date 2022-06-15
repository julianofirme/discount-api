import { Request } from 'express';
import { Company } from '../../company/entities/company.entity';

export interface UserRequest extends Request {
  user: Company;
}
