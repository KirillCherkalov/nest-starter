import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwt from 'jsonwebtoken';

import { User } from 'src/db/models/user.entity';
import { UsersService } from 'src/users/users.service';
import { EmailsService } from 'src/emails/emails.service';
import { ConfigService } from 'src/config/services/config.service';
import { DecodedUser } from 'src/common/types';

import { RegisterUserDto } from './dto/register-user.dto';
import { ChangePasswordDto } from './dto/reset-password.dto copy';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordConfirmDto } from './dto/reset-password-confirm.dto';
import { ResetToken, LoginResponse } from './types';
import { RefreshTokenDto } from './dto/refresh-token.dto';

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

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<LoginResponse> {
    const decodedUser = jwt.verify(
      refreshTokenDto.refreshToken,
      this.configService.JWT_REFRESH,
    ) as DecodedUser;

    delete decodedUser.sub;
    delete decodedUser.iat;
    delete decodedUser.exp;

    const user = decodedUser;

    return this.login(user);
  }

  private generateRefreshToken(user: User) {
    return jwt.sign(user, this.configService.JWT_REFRESH, {
      expiresIn: this.configService.JWT_REFRESH_EXPIRES_IN,
    });
  }

  async login(user: User): Promise<LoginResponse> {
    return {
      accessToken: this.jwtService.sign(user),
      refreshToken: this.generateRefreshToken(user),
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
      templateId: 'forgot-password',
      data: {
        link: `${this.configService.BASE_FRONTEND_URL}?token=${user.resetPasswordToken}`,
      },
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
