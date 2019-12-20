import { Inject, Injectable } from '@nestjs/common';

import { User } from '../db/models/user';
import { CreateUserDto } from './dto/create';

@Injectable()
export class UsersService {
  constructor(@Inject('User') private userModel: typeof User) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.query();
    return users;
  }

  async findOne(options): Promise<User> {
    const user = await this.userModel.query().findOne(options);
    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = await this.userModel.query().insert(data);
    return user;
  }

  async update(id: number, data): Promise<User> {
    const user = await this.userModel.query().patchAndFetchById(id, data);
    return user;
  }

  async remove(id: number): Promise<number> {
    const numDeleted = await this.userModel.query().deleteById(id);
    return numDeleted;
  }
}

// TODO: Eto chtoby Kostya ne zabyl kak programmirovat' na zhavaskripte

// export interface Constructor<T> {
//   new (): T;
// }

// import { timestampPlugin } from 'objection-timestamps';

// const mixins = compose(
//   timestampPlugin({
//     createdAt: 'createdAt',
//     updatedAt: 'updatedAt',
//   }),
// );

// class SuperBaseModel extends mixins(Model) {

// }

// class BaseModel extends mixins(SuperBaseModel) {

// }

// export class Repository<T extends ComposedModel> {

//   private readonly Entity: typeof ComposedModel;

//   async findOne(): Promise<T> {
//     // this.Entity.query().findOne
//     // return Promise.resolve([]);
//     return null;
//   }

//   async create(data: CreateUserDto): Promise<T> {
//     return null;
//   }

// }

// const ur = new Repository<User>();

// ur.findOne();
