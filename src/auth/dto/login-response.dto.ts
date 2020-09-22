import { User } from 'src/db/models/user.entity';

export abstract class LoginResponse {
  accessToken: string;

  refreshToken: string;

  user: User;
}
