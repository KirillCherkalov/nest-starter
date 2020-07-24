import {
  IsNumber,
  IsOptional,
  IsInt,
  Min,
  IsString,
  IsIn,
  IsArray,
} from 'class-validator';
import {
  OrderByDirection,
  ColumnRef,
  ColumnRefOrOrderByDescriptor,
} from 'objection';

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
