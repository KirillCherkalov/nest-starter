import * as helmet from 'helmet';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(3000);
}

bootstrap();
