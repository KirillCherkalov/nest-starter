import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
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
