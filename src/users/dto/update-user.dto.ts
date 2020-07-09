import {
  IsString,
  IsEmail,
  IsOptional,
  Matches,
  MinLength,
  MaxLength,
  IsDateString,
} from 'class-validator';

import { passwordExp } from 'src/common/regex';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly username?: string;

  @IsString()
  @IsOptional()
  readonly resetPasswordToken?: string;

  @IsDateString()
  @IsOptional()
  readonly resetPasswordExpires?: Date;

  @IsString()
  @IsOptional()
  @MinLength(8)
  @MaxLength(20)
  @Matches(passwordExp, { message: 'Password too weak' })
  readonly password?: string;
}
