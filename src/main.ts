import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggingService } from './logging/logging.service';
import { ResponseLoggingInterceptor } from './logging/response-logging.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggingService(),
  });
  const logger = app.get(LoggingService);

  app.useGlobalInterceptors(new ResponseLoggingInterceptor(logger));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip out any properties not defined in the DTO
      forbidNonWhitelisted: true, // Throw an error if any extra properties are found
      transform: true, // Automatically transform payloads to DTO instances
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  process.on('uncaughtException', (err) => {
    logger.handleError('Uncaught Exception', err);
    process.exit(1);
  });

  process.on('unhandledRejection', (err) => {
    logger.handleError('Unhandled Rejection', err);
    process.exit(1);
  });

  await app.listen(4000);
}

bootstrap();
