import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { UsersModule } from './users/module';
import { AuthModule } from './auth/module';
import { ConfigModule } from './config/module';

import { AppController } from './app.controller';

@Module({
  imports: [UsersModule, AuthModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
