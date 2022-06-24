export interface AuthPayload {
  sub: string;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}
