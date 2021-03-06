import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './db/db.module';
import { ConfigModule } from './config/config.module';
import { HealthCheckModule } from './healthCheck/healthCheck.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    AuthModule,
    ConfigModule,
    HealthCheckModule,
  ],
})
export class AppModule {}
