import { Module, DynamicModule } from '@nestjs/common';
import nodemailer from 'nodemailer';

import { ConfigService } from 'src/config/services/config.service';
import { ConfigModule } from 'src/config/config.module';

import { EmailsService } from './emails.service';

@Module({
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {
  static register(): DynamicModule {
    return {
      module: EmailsModule,
      imports: [ConfigModule],
      providers: [
        {
          provide: 'TEST_ACCOUNT',
          inject: [ConfigService],
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          useFactory: async (configService: ConfigService) => {
            const testAccount = await nodemailer.createTestAccount();

            return testAccount;
          },
        },
        EmailsService,
      ],
      exports: [EmailsService],
    };
  }
}
