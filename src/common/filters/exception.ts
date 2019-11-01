import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    // use some 3rd party error catching service here if needed(eg. Sentry.io)
    super.catch(exception, host);
  }
}
