import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../db/models/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validate(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    if (await user.verifyPassword(password)) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    const { id, ...data } = user.toJSON();
    const payload = { ...data, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
