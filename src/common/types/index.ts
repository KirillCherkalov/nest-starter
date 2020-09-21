import { Request } from '@nestjs/common';

import { User } from 'src/db/models/user.entity';

export interface RequestContext extends Request {
  user?: User;
}

export interface PageOptions {
  page?: number;
  pageSize?: number;
}

export interface DecodedUser extends User {
  exp: number;
  iat: number;
}
