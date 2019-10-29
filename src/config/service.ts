import * as fs from 'fs';
import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';

export type EnvConfig = Record<string, string>;

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validate(config);
  }

  private validate(envConfig: EnvConfig): EnvConfig {
    const ENV_SCHEMA = Joi.object({
      NODE_ENV: Joi.string().valid('development', 'staging', 'production').default('development'),
    });

    const { error, value: validatedEnvConfig  } = ENV_SCHEMA.validate(envConfig);

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig ;
  }
}
