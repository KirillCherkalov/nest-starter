import path from 'path';

import { Global, Module } from '@nestjs/common';
import { knexSnakeCaseMappers, Model } from 'objection';
import Knex from 'knex';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/services/config.service';

import { User } from './models/user.entity';

const models = [User];

const modelProviders = models.map(model => ({
  provide: model.name,
  useValue: model,
}));

const providers = [
  ...modelProviders,
  {
    provide: 'KnexConnection',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const knex = Knex({
        // client: 'mysql',
        client: 'pg',
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

        migrations: {
          directory: path.join(__dirname, './migrations'),
          stub: path.join(__dirname, './migration.stub'),
          extension: 'ts',
          loadExtensions: ['.js'],
        },
        seeds: {
          directory: path.join(__dirname, './seeds'),
          stub: path.join(__dirname, './seed.stub'),
          extension: 'ts',
        },

        debug: configService.isDevelopment(),
        ...knexSnakeCaseMappers(),
      });

      Model.knex(knex);

      // You can uncomment this in case you need to run migrations on app startup
      // await knex.migrate.latest();

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
