import 'dotenv/config';
import * as Knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
  migrations: {
    directory: './src/db/migrations',
    stub: './src/db/migration.stub',
  },
  seeds: {
    directory: './src/db/seeds',
    stub: './src/db/seed.stub',
  },
  ...knexSnakeCaseMappers(),
} as Knex.Config;
