import { User } from 'src/db/models/user.entity';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ResetToken {
  resetPasswordToken: string;
}

export interface DecodedUser extends User {
  exp: number;
  iat: number;
  sub: number;
}
