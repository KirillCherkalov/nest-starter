import { Request, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { User } from '../db/models/user.entity';
import { AccessToken } from './types';
import { RequestContext } from 'src/common/types';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req: RequestContext): Promise<AccessToken> {
    return this.authService.login(req.user);
  }

  @Post('registration')
  registration(): string {
    return 'registration';
  }

  @Post('logout')
  logout(): string {
    return `logout`;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  profile(@Request() req: RequestContext): User {
    return req.user;
  }
}
