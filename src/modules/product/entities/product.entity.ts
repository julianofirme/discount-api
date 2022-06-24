export class Product {
  uuid: string;
  name: string;
  description: string;
  value: number;
  quantity: number;
  logo?: string;
  company_uuid: string;

  created_at: Date;
  updated_at: Date;
}
