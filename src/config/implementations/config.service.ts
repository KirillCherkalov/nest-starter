import { IConfigDetector } from '../abstracts/config.detector';
import { Inject } from '@nestjs/common';
import { IConfig } from '../abstracts/config';
import TYPES from '../types';
import { IConfigService } from '../abstracts/config.service';

export class ConfigService implements IConfigService {
  private readonly config: IConfig;

  constructor(
    @Inject(TYPES.ConfigDetector)
    private readonly configDetector: IConfigDetector,
  ) {
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

  isDevelopment(): boolean {
    return this.NODE_ENV === 'development';
  }
}
