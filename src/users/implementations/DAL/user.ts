import { getRepository } from 'typeorm';
import { IRepository } from '../../abstracts/DAL/repository';
import { IUser } from '../../abstracts/entities/user';
import { IUserRepository } from '../../abstracts/DAL/user.repository';
import { User } from '../entities/user';

export class UserRepository implements IUserRepository {
  private readonly userRepository = getRepository(User);

  async create(entity: IUser): Promise<IUser> {
    const user = new User();
    user.email = entity.email;
    user.username = entity.username;
    user.password = entity.password;

    return entity;
  }
}
