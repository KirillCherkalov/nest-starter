import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/module';
import { AuthModule } from './auth/module';
import { ConfigModule } from './config/module';
import { ConfigService } from './config/implementations/config.service';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.DB_HOST,
          port: config.DB_PORT,
          database: config.DB_NAME,
          username: config.DB_USER,
          password: config.DB_PASSWORD,
          logging: config.isDevelopment(),
          entities: ['dist/**/entities/*{.ts,.js}'],
          /**
           * If query execution time exceed this given max execution time (in milliseconds) then logger will log this query.
           */
          maxQueryExecutionTime: 100,
          /**
           * Extra connection options to be passed to the underlying driver. Use it if you want to pass extra settings to underlying database driver.
           */
          extra: {
            /**
             * maximum number of clients the pool should contain
             * by default this is set to 10.
             */
            max: 5,
            min: 1,
            /**
             * number of milliseconds a client must sit idle in the pool and not be checked out
             * before it is disconnected from the backend and discarded
             * default is 10000 (10 seconds) - set to 0 to disable auto-disconnection of idle clients
             */
            idleTimeoutMillis: 5000,
          },
        };
      },
    }),
  ],
})
export class AppModule {}
