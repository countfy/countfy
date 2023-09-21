import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../types/JwtPayload';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/users.entity';

@Injectable()
export class AdminTokenStrategy extends PassportStrategy(
  Strategy,
  'admin-token',
) {
  private readonly logger = new Logger(AdminTokenStrategy.name);
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    this.logger.debug(`Validating Admin token: ${payload}`);
    if (!payload || payload.role !== 'admin') throw new UnauthorizedException();
    const user = await this.userService.readByEmail(payload.email);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
