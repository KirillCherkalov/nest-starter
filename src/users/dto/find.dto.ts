import { IsEmail, IsNumber } from 'class-validator';

export class FindUserDto {
  @IsEmail()
  email?: string;

  @IsNumber()
  id?: number;
}
