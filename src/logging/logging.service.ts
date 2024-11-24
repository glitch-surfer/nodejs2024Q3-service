import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggingService extends ConsoleLogger {
  logRequest(req: Request) {
    const logMessages = [`[Request] Method: ${req.method}`, `Url: ${req.url}`];
    if (this.hasKeys(req.query)) {
      logMessages.push(`Query: ${JSON.stringify(req.query)}`);
    }
    if (this.hasKeys(req.body)) {
      logMessages.push(`Body: ${JSON.stringify(req.body)}`);
    }

    this.log(logMessages.join(', '));
  }

  logResponse(res: Response) {
    const logMessages = [`[Response] Status: ${res.statusCode}`];

    this.log(logMessages.join(', '));
  }

  private hasKeys(obj: Record<string, unknown>) {
    return Object.keys(obj).length > 0;
  }
}
