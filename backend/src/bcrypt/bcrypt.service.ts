import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare, hashSync } from 'bcrypt';

@Injectable()
export class BcryptService {
  private readonly logger = new Logger(BcryptService.name);
  private salt: number;

  constructor(private readonly configService: ConfigService) {
    const salt = this.configService.get<string>('SALT_ROUNDS');
    if (!salt) {
      throw new Error('SALT_ROUNDS not set');
    }
    this.salt = parseInt(salt, 10);
  }

  public async hashPassword(password: string): Promise<string> {
    return await hashSync(password, this.salt);
  }

  public async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
}
