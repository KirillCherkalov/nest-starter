import {
  IsString,
  Matches,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

import { passwordExp } from 'src/common/regex';

export class ResetPasswordConfirmDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(passwordExp, { message: 'Password too weak' })
  readonly password: string;
}
