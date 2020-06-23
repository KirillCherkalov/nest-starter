import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter<T = any> extends BaseExceptionFilter {
  catch(exception: T, host: ArgumentsHost): void {
    // use some 3rd party error catching service here if needed(eg. Sentry.io)
    return super.catch(exception, host);
  }
}
