import { Global, Module } from '@nestjs/common';
import Knex from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';

import { ConfigModule } from '../config/module';
import { ConfigService } from '../config/services/config.service';
import { User } from './models/user';

const models = [User];

const modelProviders = models.map(model => {
  return {
    provide: model.name,
    useValue: model,
  };
});

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const knex = Knex({
        client: 'mysql',
        connection: {
          host: configService.DB_HOST,
          port: configService.DB_PORT,
          database: configService.DB_NAME,
          user: configService.DB_USER,
          password: configService.DB_PASSWORD,
        },
        pool: {
          min: 2,
          max: 10,
        },

        debug: configService.isDevelopment(),
        ...knexSnakeCaseMappers(),
      });

      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
  imports: [ConfigModule],
})
export class DatabaseModule {}
