import {
  Request,
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RequestContext } from 'src/common/types';
import { User } from 'src/db/models/user.entity';

import { AuthService } from './auth.service';
import { AccessToken } from './types';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto copy';

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

  @Post('logout')
  logout(): string {
    return `logout`;
  }

  @Post('reset-password')
  resetPassword(@Body() body: ResetPasswordDto): Promise<User> {
    return this.authService.resetPassword(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Request() req: RequestContext): User {
    return req.user;
  }
}
