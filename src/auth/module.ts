import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './controller';
import { AuthService } from './service';
import { UsersModule } from '../users/module';
import { LocalStrategy } from './strategies/local';

@Module({
  controllers: [AuthController],
  imports: [PassportModule, UsersModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
