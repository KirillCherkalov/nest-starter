export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ResetToken {
  resetPasswordToken: string;
}
