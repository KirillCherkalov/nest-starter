import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './controller';
import { AuthService } from './service';
import { UsersModule } from '../users/module';
import { LocalStrategy } from './strategies/local';
import { ConfigModule } from '../config/module';
import { ConfigService } from '../config/implementations/config.service';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.JWT_SECRET,
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
