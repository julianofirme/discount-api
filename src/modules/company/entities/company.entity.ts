import { Type } from '@prisma/client';

export class Company {
  uuid: string;
  name: string;
  email: string;
  password: string;
  document: string;
  type: Type;
  logo?: string;

  recovery_code?: string;
  recovery_date?: Date;

  zipcode?: string;
  state?: string;
  city?: string;
  street?: string;
  number?: string;
  district?: string;
  complement?: string;

  created_at: Date;
}
