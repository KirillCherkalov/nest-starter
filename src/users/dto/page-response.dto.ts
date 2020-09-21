import { User } from 'src/db/models/user.entity';

export abstract class UsersResponse {
  total: number;

  results: User[];
}
