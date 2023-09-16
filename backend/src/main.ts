import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Logger } from '@nestjs/common';

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
    .addTag('cats')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);
  logger.log(`Swagger is running on http://localhost:${port}/api`);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || '3000';
  const environment =
    process.env.NODE_ENV || ('development' as 'development' | 'production');
  logger.log(`Environment is ${environment}`);
  logger.log(`Server is running on http://localhost:${port}`);
  setupSwagger(app, port, environment);
  await app.listen(port);
}
bootstrap();
