import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local';
import { SessionSerializer } from './session.serializer';

@Module({
  controllers: [AuthController],
  imports: [
    // replace on "PassportModule.register({ defaultStrategy: 'jwt' })," for jwt auth
    PassportModule.register({ session: true }),
    UsersModule,
    SessionSerializer,
    // replace for jwt auth
    // ConfigModule,
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: configService.JWT_SECRET,
    //     signOptions: { expiresIn: '600s' },
    //   }),
    //   inject: [ConfigService],
    // }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    // add for jwt auth
    // JwtStrategy
  ],
  exports: [AuthService],
})
export class AuthModule {}
