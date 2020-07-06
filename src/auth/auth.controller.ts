import {
  Request,
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RequestContext } from 'src/common/types';
import { User } from 'src/db/models/user.entity';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto copy';
import { SessionGuard } from './guards/session-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(): Promise<void> {
    // replace for jwt auth
    // return this.authService.login(req.user);
    return;
  }

  @Post('registration')
  registration(@Body() body: RegisterUserDto): Promise<User> {
    return this.authService.register(body);
  }

  @Post('logout')
  logout(@Request() req: RequestContext): void {
    req.session.destroy(function (error) {
      throw new UnauthorizedException(error);
    });
  }

  @Post('reset-password')
  resetPassword(@Body() body: ResetPasswordDto): Promise<User> {
    return this.authService.resetPassword(body);
  }

  @UseGuards(SessionGuard)
  @Get('profile')
  profile(@Request() req: RequestContext): User {
    return req.user;
  }
}
