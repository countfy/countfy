import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  autoLoadEntities: true,
  logging: false,
  entities: ['dist/src/**/*.entity{.js,.ts}'],
  migrations: ['dist/src/migrations/**/*{.js,.ts}'],
  subscribers: ['dist/src/subscribers/**/*{.js,.ts}'],
} as TypeOrmModuleOptions;
