import {
  Request,
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Query,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

import { RequestContext } from 'src/common/types';
import { User } from 'src/db/models/user.entity';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordConfirmDto } from './dto/reset-password-confirm.dto';
import { ResetToken, AccessToken } from './types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @Post('login')
  login(@Request() req: RequestContext): Promise<AccessToken> {
    return this.authService.login(req.user);
  }

  @Post('registration')
  registration(@Body() body: RegisterUserDto): Promise<User> {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('password')
  changePassword(@Body() body: ChangePasswordDto): Promise<User> {
    return this.authService.changePassword(body);
  }

  @Post('password/reset')
  @ApiQuery({ name: 'resetPasswordToken', description: 'Reset password token' })
  resetPasswordConfirm(
    @Query() query: ResetToken,
    @Body() body: ResetPasswordConfirmDto,
  ): Promise<User> {
    return this.authService.resetPassword(query, body);
  }

  @Post('password/forgot')
  forgotPassword(@Body() body: ForgotPasswordDto): Promise<string | false> {
    return this.authService.forgotPassword(body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  profile(@Request() req: RequestContext): User {
    return req.user;
  }
}
