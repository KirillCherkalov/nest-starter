import helmet from 'helmet';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';

import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipes/validation';
import { AllExceptionsFilter } from './common/filters/exception';
import { Swagger } from './common/services/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);
  const swagger = new Swagger(app);

  swagger.init();

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  await app.listen(3000);
}

bootstrap();
