import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './db/module';
import { ConfigModule } from './config/module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, ConfigModule],
})
export class AppModule {}
