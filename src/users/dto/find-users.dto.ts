import { IsNumber, IsOptional, IsInt, Min } from 'class-validator';

import { PageOptions } from 'src/common/types';

export class FindUsersDto implements PageOptions {
  @IsNumber()
  @IsInt()
  @Min(0)
  @IsOptional()
  page?: number;

  @IsNumber()
  @IsInt()
  @Min(0)
  @IsOptional()
  pageSize?: number;
}
