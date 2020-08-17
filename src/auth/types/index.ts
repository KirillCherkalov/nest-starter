import { User } from 'src/db/models/user.entity';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface ResetToken {
  resetPasswordToken: string;
}
