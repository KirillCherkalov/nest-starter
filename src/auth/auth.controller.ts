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
import { GetUser } from 'src/common/decorators/user.decorator';
import { RegisterUserDto } from 'src/common/dto/register-user.dto';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordConfirmDto } from './dto/reset-password-confirm.dto';
import { ResetToken } from './types';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LoginResponse } from './dto/login-response.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto })
  @Post('login')
  login(@GetUser() user: User): Promise<LoginResponse> {
    return this.authService.login(user);
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
  forgotPassword(@Body() body: ForgotPasswordDto): Promise<User> {
    return this.authService.forgotPassword(body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  profile(@Request() req: RequestContext): User {
    return req.user;
  }

  @Post('token/refresh')
  refreshToken(@Body() body: RefreshTokenDto): Promise<LoginResponse> {
    return this.authService.refreshToken(body);
  }
}
