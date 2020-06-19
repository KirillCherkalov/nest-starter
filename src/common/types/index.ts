import { Request } from '@nestjs/common';

import { User } from 'src/db/models/user.entity';

export interface RequestContext extends Request {
  user?: User;
}
