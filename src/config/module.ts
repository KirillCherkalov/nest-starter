import { Module } from '@nestjs/common';
import { ConfigDetector } from './implementations/config.detector';
import { ConfigService } from './implementations/config.service';
import { JoiValidator } from './implementations/validator';
import TYPES from './types';

@Module({
  providers: [
    {
      provide: TYPES.Validator,
      useClass: JoiValidator,
    },
    {
      provide: TYPES.ConfigDetector,
      useClass: ConfigDetector,
    },
    {
      provide: TYPES.ConfigService,
      useClass: ConfigService,
    },
  ],
  exports: [TYPES.ConfigService],
})
export class ConfigModule {}
