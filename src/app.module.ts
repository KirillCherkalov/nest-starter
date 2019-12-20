import { Module } from '@nestjs/common';

import { UsersModule } from './users/module';
import { AuthModule } from './auth/module';
import { DatabaseModule } from './db/module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule],
})
export class AppModule {}
