import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingService } from './logging/logging.service';
import { ResponseLoggingInterceptor } from './logging/response-logging.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggingService(),
  });

  app.useGlobalInterceptors(
    new ResponseLoggingInterceptor(app.get(LoggingService)),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip out any properties not defined in the DTO
      forbidNonWhitelisted: true, // Throw an error if any extra properties are found
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(4000);
}

bootstrap();
