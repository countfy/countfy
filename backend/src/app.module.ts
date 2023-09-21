import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SeedModule } from './seed/seed.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { ProjectModule } from './project/project.module';
import { TimerModule } from './timer/timer.module';
import { UserProjectModule } from './user-project/user-project.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('DB_HOST');
        const port = configService.get<number>('DB_PORT');
        const username = configService.get<string>('DB_USER');
        const password = configService.get<string>('DB_PASSWORD');
        const database = configService.get<string>('DB_NAME');
        const nodeEnv = configService.get<string>('NODE_ENV');
        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          autoLoadEntities: true,
          synchronize: nodeEnv === 'development',
          dropSchema: false,
          logging: false,
          entities: ['dist/**/*.entity{.js,.ts}'],
          migrations: ['dist/src/migrations/**/*{.js,.ts}'],
          subscribers: ['dist/src/subscribers/**/*{.js,.ts}'],
          cli: {
            migrationsDir: 'src/migrations',
            subscribersDir: 'src/subscribers',
          },
        };
      },
    }),
    AuthModule,
    UserModule,
    SeedModule,
    BcryptModule,
    ProjectModule,
    TimerModule,
    UserProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
