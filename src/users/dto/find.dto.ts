import { IsEmail, IsNumber, IsString } from 'class-validator';

export class FindUserDto {
  @IsEmail()
  email?: string;

  @IsNumber()
  id?: number;

  @IsString()
  resetPasswordToken?: string;
}
