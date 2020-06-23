import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../db/models/user.entity';
import { UsersService } from '../users/users.service';

import { AccessToken } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne({ email });

    if (await user.verifyPassword(password)) {
      return user;
    }

    return null;
  }

  async login(user: User): Promise<AccessToken> {
    const { id, ...data } = user.toJSON();
    const payload = { ...data, sub: id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
