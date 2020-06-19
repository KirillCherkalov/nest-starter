import * as Joi from '@hapi/joi';
import { Config } from '../types/config';

const schema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'staging', 'production')
    .default('development'),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number()
    .integer()
    .required(),
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  APP_PORT: Joi.number()
    .integer()
    .required(),
  JWT_SECRET: Joi.string().required(),
});

export class ConfigValidator {
  public validate(value: any): Config {
    const config = Joi.attempt(value, schema, {
      abortEarly: false,
      convert: true,
      stripUnknown: true,
    }) as Config;

    return config;
  }
}
