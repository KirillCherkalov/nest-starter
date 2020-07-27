import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/services/config.service';
import { UsersModule } from 'src/users/users.module';
import { EmailsModule } from 'src/emails/emails.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local';
import { JwtStrategy } from './strategies/jwt';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    ConfigModule,
    EmailsModule.register(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.JWT_SECRET,
        signOptions: { expiresIn: configService.JWT_EXPIRES_IN },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
