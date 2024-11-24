import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { concatMap, from, Observable, tap } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable()
export class ResponseLoggingInterceptor implements NestInterceptor {
  constructor(private readonly loggingService: LoggingService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    await this.loggingService.logRequest(request);

    return next
      .handle()
      .pipe(tap(() => this.loggingService.logResponse(response)));
  }
}
