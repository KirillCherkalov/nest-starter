import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import bcrypt from 'bcrypt';
import { add, compareAsc } from 'date-fns';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/db/models/user.entity';
import { UsersService } from 'src/users/users.service';
import { EmailsService } from 'src/emails/emails.service';

import { RegisterUserDto } from './dto/register-user.dto';
import { ChangePasswordDto } from './dto/reset-password.dto copy';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordConfirmDto } from './dto/reset-password-confirm.dto';
import { ResetToken, AccessToken } from './types';

const SALT_ROUNDS = 12;

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly emailsService: EmailsService,
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

  async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<string | false> {
    const user = await this.usersService.findOne(forgotPasswordDto);

    if (!user) {
      throw new NotFoundException(
        `User with email ${forgotPasswordDto.email} not found`,
      );
    }

    const resetPasswordToken = await bcrypt.hash(
      forgotPasswordDto.email,
      SALT_ROUNDS,
    );
    const resetPasswordExpiresAt = add(new Date(), { days: 1 });

    await this.usersService.update(user.id, {
      resetPasswordExpiresAt,
      resetPasswordToken,
    });

    return this.emailsService.sendMail({
      from: 'effective-soft@team.com',
      to: user.email,
      subject: 'Hello ',
      html: `resetPasswordToken=${resetPasswordToken}`,
    });
  }

  async resetPasswordConfirm(
    query: ResetToken,
    resetPasswordConfirmDto: ResetPasswordConfirmDto,
  ): Promise<User | never> {
    const { password } = resetPasswordConfirmDto;

    const user = await this.usersService.findOne(query);

    if (!user) {
      throw new UnauthorizedException(
        'Password reset token is invalid or has expired.',
      );
    }

    if (compareAsc(new Date(), user.resetPasswordExpiresAt) !== -1) {
      throw new UnauthorizedException('Password reset token has expired.');
    }

    const updatableUser = this.usersService.update(user.id, {
      password,
      resetPasswordExpiresAt: null,
      resetPasswordToken: null,
    });

    return updatableUser;
  }

  async checkResetToken(
    changePasswordDto: ChangePasswordDto,
  ): Promise<User | never> {
    const { email, oldPassword, newPassword } = changePasswordDto;

    const user = await this.validate(email, oldPassword);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const updatableUser = this.usersService.update(user.id, {
      password: newPassword,
    });

    return updatableUser;
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<User | never> {
    const { email, oldPassword, newPassword } = changePasswordDto;

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
