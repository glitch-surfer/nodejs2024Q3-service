import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip out any properties not defined in the DTO
      forbidNonWhitelisted: true, // Throw an error if any extra properties are found
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );

  await app.listen(4000);
}
bootstrap();
