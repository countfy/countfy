import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/JwtPayload';

export class AdminTokenStrategy extends PassportStrategy(
  Strategy,
  'admin-token',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: JwtPayload) {
    if (!payload || payload.role !== 'admin') throw new UnauthorizedException();
    return payload;
  }
}
