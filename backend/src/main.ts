import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { INestApplication, Logger } from '@nestjs/common';
import { json, urlencoded } from 'express';

const logger = new Logger('main.ts');

const setupSwagger = (
  app: INestApplication,
  port: string,
  environment: string,
) => {
  if (environment === 'production') return;
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Countfy API')
    .setDescription('Countfy API description')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Enter JWT token',
      name: 'Authorization',
    })
    .build();

  const swaggerOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument, swaggerOptions);
  logger.log(`Swagger is running on http://localhost:${port}/api/docs 📖`);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const port = process.env.PORT || '3000';
  const environment =
    process.env.NODE_ENV || ('development' as 'development' | 'production');

  logger.log(`Environment is ${environment} 🌎`);
  logger.log(`Server is running on http://localhost:${port} 🚀`);

  setupSwagger(app, port, environment);
  await app.listen(port);
}
bootstrap();
