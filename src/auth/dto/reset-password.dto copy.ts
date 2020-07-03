import {
  IsString,
  IsEmail,
  Matches,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

import { passwordExp } from 'src/common/regex';

export class ResetPasswordDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(passwordExp, { message: 'Password too weak' })
  readonly newPassword: string;
}
