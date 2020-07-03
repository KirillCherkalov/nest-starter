import { IsString, IsEmail } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
