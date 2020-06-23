import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '../../config/services/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.JWT_SECRET,
    });
  }

  async validate<T extends { sub: string }>(
    payload: T,
  ): Promise<
    {
      id: string;
    } & Pick<T, Exclude<keyof T, 'sub'>>
  > {
    const { sub, ...user } = payload;

    return { id: sub, ...user };
  }
}
