export interface CompanyPayload {
  sub: string;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}
