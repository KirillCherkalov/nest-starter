import { IRepository } from './repository';
import { IUser } from '../entities/user';

export interface IUserRepository extends IRepository<IUser> {}
