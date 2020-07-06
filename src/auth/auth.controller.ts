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
    return;
  }

  // replace current login method on this for jwt auth
  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // login(@Request() req: RequestContext): Promise<AccessToken> {
  //   return this.authService.login(req.user);
  // }

  @Post('registration')
  registration(@Body() body: RegisterUserDto): Promise<User> {
    return this.authService.register(body);
  }

  @Post('logout')
  logout(@Request() req: RequestContext): void {
    /**
     * It is required to pass cb function to destroy method.
     * But for now it useless. So I pass empty arrow function to avoid typescript error
     * and disabled eslint rule to pass eslint
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    req.session.destroy(() => {});
  }

  @Post('reset-password')
  resetPassword(@Body() body: ResetPasswordDto): Promise<User> {
    return this.authService.resetPassword(body);
  }

  // replace SessionGuard on JwtAuthGuard for jwt auth
  @UseGuards(SessionGuard)
  @Get('profile')
  profile(@Request() req: RequestContext): User {
    return req.user;
  }
}
