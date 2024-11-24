import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'node:fs';
import { join, resolve } from 'node:path';

@Injectable()
export class LoggingService extends ConsoleLogger {
  private readonly logsDir = resolve('logs');
  private readonly logFilePath = join(this.logsDir, 'application.log');
  private readonly errorLogFilePath = join(this.logsDir, 'error.log');
  private readonly maxFileSize = process.env.MAX_LOG_FILE_SIZE || 1024 * 1024;

  constructor() {
    super();
    fs.promises.stat(this.logsDir).catch(() => fs.promises.mkdir(this.logsDir));
  }

  async handleError(context: string, error: any) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    const stack = error instanceof Error ? error.stack : '';
    await this.error(message, stack, context);
  }

  async logRequest(req: Request) {
    const logMessages = [`[Request] Method: ${req.method}`, `Url: ${req.url}`];
    if (this.hasKeys(req.query)) {
      logMessages.push(`Query: ${JSON.stringify(req.query)}`);
    }
    if (this.hasKeys(req.body)) {
      logMessages.push(`Body: ${JSON.stringify(req.body)}`);
    }

    await this.log(logMessages.join(', '));
  }

  async logResponse(res: Response) {
    const logMessages = [`[Response] Status: ${res.statusCode}`];

    await this.log(logMessages.join(', '));
  }

  override async log(message: string, context?: string) {
    const formattedMessage = `[LOG] ${context ?? ''} - ${message}`;
    super.log(formattedMessage);
    await this.writeLogToFile(formattedMessage);
  }

  override async error(message: string, stack?: string, context?: string) {
    const formattedMessage = `[ERROR] ${context ?? ''} - ${message} - ${
      stack ?? ''
    }`;
    super.error(formattedMessage);
    await this.writeLogToFile(formattedMessage);
    await this.writeLogToFile(formattedMessage, true);
  }

  override async warn(message: string, context?: string) {
    const formattedMessage = `[WARN] ${context ?? ''} - ${message}`;
    super.warn(formattedMessage);
    await this.writeLogToFile(formattedMessage);
  }

  override async debug(message: string, context?: string) {
    const formattedMessage = `[DEBUG] ${context ?? ''} - ${message}`;
    super.debug(formattedMessage);
    await this.writeLogToFile(formattedMessage);
  }

  override async verbose(message: string, context?: string) {
    const formattedMessage = `[VERBOSE] ${context ?? ''} - ${message}`;
    super.verbose(formattedMessage);
    await this.writeLogToFile(formattedMessage);
  }

  private hasKeys(obj: Record<string, unknown>) {
    return Object.keys(obj).length > 0;
  }

  private async rotateFileIfNeeded(filePath: string) {
    let stats: fs.Stats;
    try {
      stats = await fs.promises.stat(filePath);
    } catch (error) {
      await fs.promises.writeFile(filePath, '');
    }

    if (stats?.size > this.maxFileSize) {
      const rotatedFilename = `${filePath}.${new Date().toISOString()}`;
      await fs.promises.rename(filePath, rotatedFilename);
    }
  }

  private async writeLogToFile(message: string, isError = false) {
    const logFilePath = isError ? this.errorLogFilePath : this.logFilePath;
    await this.rotateFileIfNeeded(logFilePath);
    await fs.promises.appendFile(logFilePath, `${message}\n`);
  }
}
