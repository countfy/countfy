import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/JwtPayload';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserTokenStrategy extends PassportStrategy(
  Strategy,
  'user-token',
) {
  private readonly logger = new Logger(UserTokenStrategy.name);
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: JwtPayload) {
    this.logger.debug(`Validating User token: ${payload}`);
    if (!payload) throw new UnauthorizedException();
    const user = this.userService.readByEmail(payload.email);
    if (!user) throw new UnauthorizedException();
  }
}
