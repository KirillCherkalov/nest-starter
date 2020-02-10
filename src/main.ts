import helmet from 'helmet';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';

import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipes/validation';
import { AllExceptionsFilter } from './common/filters/exception';
import { ConfigService } from './config/services/config.service';
import { Swagger } from './common/services/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  const { httpAdapter } = app.get(HttpAdapterHost);
  const swagger = new Swagger(app);

  swagger.init();

  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const configServiceInstance = await app.resolve(ConfigService);
  await app.listen(configServiceInstance.APP_PORT);
}

bootstrap();
