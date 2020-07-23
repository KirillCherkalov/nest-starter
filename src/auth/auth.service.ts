import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/db/models/user.entity';
import { UsersService } from 'src/users/users.service';
import { EmailsService } from 'src/emails/emails.service';
import { ConfigService } from 'src/config/services/config.service';

import { RegisterUserDto } from './dto/register-user.dto';
import { ChangePasswordDto } from './dto/reset-password.dto copy';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordConfirmDto } from './dto/reset-password-confirm.dto';
import { ResetToken, AccessToken } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly emailsService: EmailsService,
    private readonly configService: ConfigService,
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

    await user.generatePasswordResetToken();
    await user.$query().patch();

    return this.emailsService.sendMail({
      from: 'effective-soft@team.com',
      to: user.email,
      subject: 'Hello ',
      html: `${this.configService.BASE_FRONTEND_URL}/reset?token=${user.resetPasswordToken}`,
    });
  }

  async resetPassword(
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

    if (!user.isPasswordResetTokenValid()) {
      throw new UnauthorizedException('Password reset token has expired.');
    }

    await user.$query().patch({
      password,
      resetPasswordExpiresAt: null,
      resetPasswordToken: null,
    });

    return user;
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<User | never> {
    const { email, oldPassword, newPassword } = changePasswordDto;

    const user = await this.validate(email, oldPassword);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await user.$query().patch({ password: newPassword });

    return user;
  }
}
