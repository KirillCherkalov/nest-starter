import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import passport from 'passport';
import session from 'express-session';
import connectRedis from 'connect-redis';
import * as redis from 'redis';

import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipes/validation';
import { AllExceptionsFilter } from './common/filters/exception';
import { ConfigService } from './config/services/config.service';
import { Swagger } from './common/services/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');
  const swagger = new Swagger(app);

  swagger.init();

  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter());

  const configServiceInstance = await app.resolve(ConfigService);

  // remove this for jwt auth
  app.use(
    session({
      secret: configServiceInstance.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      /**
       * You also can remove "store" key(for test purpose) and do not use Redis, but keep in mind that
       * The default server-side session storage, MemoryStore, is purposely not designed for a production environment.
       * It will leak memory under most conditions, does not scale past a single process,
       * and is meant for debugging and developing.
       * https://github.com/expressjs/session#sessionoptions
       */
      store: new (connectRedis(session))({
        /**
         * If you have redis-server running on the same machine as node,
         * then the defaults for port and host are probably fine
         * and you don't need to supply any arguments.
         * https://github.com/NodeRedis/node-redis#rediscreateclient
         */
        client: redis.createClient(),
      }),
    }),
  );
  // also remove passport.initialize() and passport.session() for jwt auth
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(configServiceInstance.APP_PORT);
}

bootstrap();
