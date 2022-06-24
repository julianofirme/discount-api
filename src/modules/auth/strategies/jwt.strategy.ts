import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthFromJwt } from '../models/AuthFromJwt';
import { AuthPayload } from '../models/AuthPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: AuthPayload): Promise<AuthFromJwt> {
    return {
      uuid: payload.sub,
      email: payload.email,
      name: payload.name,
    };
  }
}
