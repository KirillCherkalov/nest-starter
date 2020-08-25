import { Module } from '@nestjs/common';

import { EmailsModule } from 'src/emails/emails.module';
import { ConfigModule } from 'src/config/config.module';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [EmailsModule.register(), ConfigModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
