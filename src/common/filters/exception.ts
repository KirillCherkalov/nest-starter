import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UniqueViolationError } from 'objection';
import {
  TokenExpiredError,
  JsonWebTokenError,
  NotBeforeError,
} from 'jsonwebtoken';

import { ConfigService } from 'src/config/services/config.service';

interface errorResponse<T> {
  path: string;
  timestamp: string;
  exception?: unknown;
  errors?: unknown;
}

@Catch()
export class AllExceptionsFilter<T = any> implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof UniqueViolationError) {
      status = HttpStatus.CONFLICT;
    }

    if (
      exception instanceof UnauthorizedException ||
      exception instanceof TokenExpiredError
    ) {
      status = HttpStatus.UNAUTHORIZED;
    }

    if (exception instanceof JsonWebTokenError) {
      status = HttpStatus.BAD_REQUEST;
    }

    if (exception instanceof NotBeforeError) {
      status = HttpStatus.BAD_REQUEST;
    }

    const responseObj: errorResponse<T> = {
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (exception instanceof BadRequestException) {
      responseObj.errors = exception.getResponse();
    }

    // do not show exception on production because it can include an sql query to the database
    if (
      this.configService.NODE_ENV !== 'production' &&
      !(exception instanceof BadRequestException)
    ) {
      responseObj.exception = exception;
    }

    response.status(status).json(responseObj);
  }
}
