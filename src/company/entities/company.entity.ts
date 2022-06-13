export class Company {
  uuid: string;
  name: string;
  email: string;
  password: string;
  document: string;
  logo?: string;

  zipcode?: string;
  state?: string;
  city?: string;
  street?: string;
  number?: string;
  district?: string;
  complement?: string;

  created_at: Date;
}
