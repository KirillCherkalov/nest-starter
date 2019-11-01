import { Injectable, Inject } from '@nestjs/common';

import { IConfigService } from './config/abstracts/config.service';
import TYPES from './config/types';

@Injectable()
export class AppService {
  constructor(
    @Inject(TYPES.ConfigService) private readonly configService: IConfigService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  getNodeEnv(): string {
    return this.configService.getNodeEnv();
  }
}
