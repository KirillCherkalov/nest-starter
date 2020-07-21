import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { UniqueViolationError } from 'objection';

import { ConfigService } from 'src/config/services/config.service';

interface errorResponse<T> {
  path: string;
  timestamp: string;
  exception?: T;
}

@Catch()
export class AllExceptionsFilter<T = any> implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {}

  catch(exception: T, host: ArgumentsHost): void {
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

    if (exception instanceof UnauthorizedException) {
      status = HttpStatus.UNAUTHORIZED;
    }

    const responseObj: errorResponse<T> = {
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (this.configService.NODE_ENV !== 'production') {
      responseObj.exception = exception;
    }

    response.status(status).json(responseObj);
  }
}
