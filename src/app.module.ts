import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/module';

@Module({
  imports: [UsersModule, AuthModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
