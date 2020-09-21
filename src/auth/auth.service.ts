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
import { RegisterUserDto } from 'src/common/dto/register-user.dto';

import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordConfirmDto } from './dto/reset-password-confirm.dto';
import { ResetToken } from './types';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LoginResponse } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly emailsService: EmailsService,
    private readonly configService: ConfigService,
  ) {}

  private getDecodeUser(token: string, secretOrPublicKey: string): User {
    const decodedUser = jwt.verify(token, secretOrPublicKey) as DecodedUser;

    delete decodedUser.iat;
    delete decodedUser.exp;

    return decodedUser;
  }

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
    const user = this.getDecodeUser(
      refreshTokenDto.refreshToken,
      this.configService.JWT_REFRESH,
    );

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
      user,
    };
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const user = await this.usersService.register(registerUserDto);

    return user;
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<User> {
    const user = await this.usersService.findOne(forgotPasswordDto);

    if (!user) {
      throw new NotFoundException(
        `User with email ${forgotPasswordDto.email} not found`,
      );
    }

    await user.generatePasswordResetToken();
    await user.$query().patch();

    this.emailsService.sendMail({
      from: 'effective-soft@team.com',
      to: user.email,
      subject: 'Hello ',
      templateId: 'forgot-password',
      data: {
        link: `${this.configService.BASE_FRONTEND_URL}?token=${user.resetPasswordToken}`,
      },
    });

    return user;
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
