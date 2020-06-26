import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UniqueViolationError } from 'objection';
import dotenv from 'dotenv';

@Catch()
export class AllExceptionsFilter<T = any> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const { parsed } = dotenv.config();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof UniqueViolationError) {
      status = HttpStatus.CONFLICT;
    }

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      exception: parsed.NODE_ENV !== 'production' && exception,
    });
  }
}
