import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CompanyFromJwt } from '../models/CompanyFromJwt';
import { CompanyPayload } from '../models/CompanyPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: CompanyPayload): Promise<CompanyFromJwt> {
    return {
      uuid: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}
