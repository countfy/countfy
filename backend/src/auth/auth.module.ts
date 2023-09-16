import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AdminTokenStrategy } from './strategies/admin-token.strategy';
import { UserTokenStrategy } from './strategies/user-token.strategy';
@Module({
  imports: [
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const JWT_SECRET = configService.get<string>('JWT_SECRET');
        const JWT_EXPIRATION_TIME = configService.get<string>(
          'JWT_EXPIRATION_TIME',
        );
        return {
          secret: JWT_SECRET,
          signOptions: {
            expiresIn: JWT_EXPIRATION_TIME,
          },
        };
      },
    }),
  ],
  providers: [AuthService, AdminTokenStrategy, UserTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
