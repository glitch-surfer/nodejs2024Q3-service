import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService extends ConsoleLogger {
  // override log(message: string, context?: string) {
  //   super.log('🚀 ' + message, context);
  // }
}
