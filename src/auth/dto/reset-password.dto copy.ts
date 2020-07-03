import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly oldPassword: string;

  @IsString()
  @IsNotEmpty()
  readonly newPassword: string;
}
