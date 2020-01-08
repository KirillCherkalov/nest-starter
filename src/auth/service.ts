import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validate(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    if (await user.verifyPassword(password)) {
      return user;
    }

    return null;
  }
}
