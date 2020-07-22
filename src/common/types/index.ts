// need to discuss
// import { Request } from '@nestjs/common';
import { Request } from 'express';

import { User } from 'src/db/models/user.entity';

export interface RequestContext extends Request {
  user?: User;
}

export interface PageOptions {
  page?: number;
  pageSize?: number;
}

export interface Page<T> {
  total: number;
  results: T[];
}
