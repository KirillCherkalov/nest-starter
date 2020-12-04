import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipes/validation';
import { AllExceptionsFilter } from './common/filters/exception';
import { ConfigService } from './config/services/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configServiceInstance = await app.resolve(ConfigService);

  app.setGlobalPrefix('/api/v1');

  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(configServiceInstance));

  await app.listen(configServiceInstance.APP_PORT);
  Logger.log(
    `Listening on port ${configServiceInstance.APP_PORT}`,
    'NestApplication',
  );
}

bootstrap();
