import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/db/models/user.entity';
import { UsersService } from 'src/users/users.service';

import { AccessToken } from './types';
import { RegisterUserDto } from './dto/register-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto copy';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validate(email: string, password: string): Promise<User | never> {
    const user = await this.usersService.findOne({ email });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    if (user && (await user.verifyPassword(password))) {
      return user;
    }

    return null;
  }

  async login(user: User): Promise<AccessToken> {
    const { id, ...data } = user.toJSON();
    const payload = { ...data, sub: id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const user = await this.usersService.create(registerUserDto);

    return user;
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<User | never> {
    const { email, oldPassword, newPassword } = resetPasswordDto;

    const user = await this.validate(email, oldPassword);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const updatableUser = this.usersService.update(user.id, {
      password: newPassword,
    });

    return updatableUser;
  }
}
