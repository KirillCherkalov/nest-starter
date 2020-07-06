import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSerializer<T = any> extends PassportSerializer {
  serializeUser(user: T, done: (err: Error, user: any) => void): any {
    done(null, user);
  }

  deserializeUser(payload: T, done: (err: Error, payload: T) => void): any {
    done(null, payload);
  }
}
