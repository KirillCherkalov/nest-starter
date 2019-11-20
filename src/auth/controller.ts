import { Controller, Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Authentication')
@Controller('auth')
export class AuthController {
  @Post('login')
  login(): string {
    return 'login';
  }

  @Post('registration')
  registration(): string {
    return 'registration';
  }

  @Post('logout')
  logout(): string {
    return `logout`;
  }
}
