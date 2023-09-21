import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { UserService } from 'src/user/user.service';
import { SingInDto } from './dto/sing-in.dto';
import { SingUpDto } from './dto/sing-up.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  public async validateUser(email: string, pass: string): Promise<boolean> {
    const user = await this.userService.readByEmail(email);
    if (user) {
      const isMatch = await this.bcryptService.comparePasswords(
        pass,
        user.password,
      );
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
      const isMatch = await this.bcryptService.comparePasswords(
        password,
        userFound.password,
      );
      if (isMatch) {
        const payload = {
          email: userFound.email,
          id: userFound.id,
          role: userFound.role,
        };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    }
    return null;
  }

  public async register(user: SingUpDto) {
    const data = new CreateUserDto({
      email: user.email,
      password: user.password,
      role: 'user',
    });

    const newUser = await this.userService.createOne(data);
    const payload = { email: newUser.email, sub: newUser.id };
    this.logger.log('User created successfully');
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
