import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validate(username: string, pass: string): Promise<any> {
    return true;
  }
}
