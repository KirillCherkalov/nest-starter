import { Injectable } from '@nestjs/common';

import { Config } from '../types/config';

import { ConfigDetector } from './config.detector';

@Injectable()
export class ConfigService {
  private readonly config: Config;

  constructor(private readonly configDetector: ConfigDetector) {
    this.config = this.configDetector.getConfig();
  }

  get NODE_ENV(): string {
    return this.config.NODE_ENV;
  }

  get DB_HOST(): string {
    return this.config.DB_HOST;
  }

  get DB_PORT(): number {
    return this.config.DB_PORT;
  }

  get DB_NAME(): string {
    return this.config.DB_NAME;
  }

  get DB_USER(): string {
    return this.config.DB_USER;
  }

  get DB_PASSWORD(): string {
    return this.config.DB_PASSWORD;
  }

  get APP_PORT(): number {
    return this.config.APP_PORT;
  }

  // replace SESSION_SECRET on this for jwt auth
  // get JWT_SECRET(): string {
  //   return this.config.JWT_SECRET;
  // }

  get SESSION_SECRET(): string {
    return this.config.SESSION_SECRET;
  }

  isDevelopment(): boolean {
    return this.NODE_ENV === 'development';
  }
}
