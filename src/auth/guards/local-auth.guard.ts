import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard<T = any> extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const result = (await super.canActivate(context)) as boolean; // THIS MUST BE CALLED FIRST

    await super.logIn(request);

    return result;
  }

  handleRequest<TUser = any>(err: T, user: TUser): TUser | never {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
