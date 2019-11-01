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

  public getNodeEnv(): string {
    return this.config.NODE_ENV;
  }
}
