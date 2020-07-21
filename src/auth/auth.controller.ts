import {
  Request,
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RequestContext } from 'src/common/types';
import { User } from 'src/db/models/user.entity';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { ChangePasswordDto } from './dto/reset-password.dto copy';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordConfirmDto } from './dto/reset-password-confirm.dto';
import { ResetToken, AccessToken } from './types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: RequestContext): Promise<AccessToken> {
    return this.authService.login(req.user);
  }

  @Post('registration')
  registration(@Body() body: RegisterUserDto): Promise<User> {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  changePassword(@Body() body: ChangePasswordDto): Promise<User> {
    return this.authService.changePassword(body);
  }

  @Post('reset-password-confirm')
  resetPasswordConfirm(
    @Query() query: ResetToken,
    @Body() body: ResetPasswordConfirmDto,
  ): Promise<User> {
    return this.authService.resetPasswordConfirm(query, body);
  }

  @Post('forgot')
  forgotPassword(@Body() body: ForgotPasswordDto): Promise<void> {
    return this.authService.forgotPassword(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req: RequestContext): User {
    return req.user;
  }
}
