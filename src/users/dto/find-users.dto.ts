import {
  IsOptional,
  IsInt,
  Min,
  IsString,
  IsIn,
  IsArray,
} from 'class-validator';
import { Transform } from 'class-transformer';
import {
  OrderByDirection,
  ColumnRef,
  ColumnRefOrOrderByDescriptor,
} from 'objection';

import { PageOptions } from 'src/common/types';

export class FindUsersDto implements PageOptions {
  @IsInt()
  @Min(0)
  @IsOptional()
  @Transform(page => parseInt(page), { toClassOnly: true })
  page?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Transform(pageSize => parseInt(pageSize), { toClassOnly: true })
  pageSize?: number;

  @IsString()
  @IsOptional()
  column?: ColumnRef;

  @IsString()
  @IsOptional()
  @IsIn(['asc', 'desc', 'ASC', 'DESC'])
  order?: OrderByDirection;

  // TODO need to provide custom validator which will check nested values
  @IsArray()
  @IsOptional()
  columns?: ColumnRefOrOrderByDescriptor[];

  @IsString()
  @IsOptional()
  search?: string;
}
