import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hashSync } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { SingInDto } from './dto/sing-in.dto';
import { SingUpDto } from './dto/sing-up.dto';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  private salt: string;

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.salt = this.configService.get<string>('SALT_ROUNDS');
  }

  public async validateUser(email: string, pass: string): Promise<boolean> {
    const user = await this.userService.readByEmail(email);
    if (user) {
      const isMatch = await this.comparePasswords(pass, user.password);
      if (isMatch) {
        return true;
      }
    }
    return false;
  }

  public async login(user: SingInDto) {
    const { email, password } = user;
    const userFound = await this.userService.readByEmail(email);
    if (userFound) {
      const isMatch = await this.comparePasswords(password, userFound.password);
      if (isMatch) {
        const payload = { email: userFound.email, sub: userFound.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }
    return null;
  }

  public async register(user: SingUpDto) {
    const passwordHash = await this.hashPassword(user.password);
    const newUser = await this.userService.createOne({
      ...user,
      password: passwordHash,
    });
    const payload = { email: newUser.email, sub: newUser.id };
    this.logger.log('User created successfully');
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private hashPassword(password: string): string {
    return hashSync(password, this.salt);
  }

  private async comparePasswords(
    newPassword: string,
    passwordHash: string,
  ): Promise<boolean> {
    return await compare(newPassword, passwordHash);
  }
}
