import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe());


  // Set up Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description for your NestJS application')
    .setVersion('1.0')
    .addBearerAuth() // Enable Bearer Auth for JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
}
bootstrap();
