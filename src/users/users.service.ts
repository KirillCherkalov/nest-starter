import { Inject, Injectable } from '@nestjs/common';

import { Page } from 'src/common/types';

import { User } from '../db/models/user.entity';

import { CreateUserDto } from './dto/create.dto';
import { FindUserDto } from './dto/find.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('User') private userModel: typeof User) {}

  async findAll(findUserDto: FindUsersDto): Promise<Page<User>> {
    const { page, pageSize } = findUserDto;
    const users = await this.userModel.query().page(page, pageSize);

    return users;
  }

  async findOne(findUserDto: FindUserDto): Promise<User> {
    const user = await this.userModel.query().findOne(findUserDto);

    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = await this.userModel.query().insert(data);

    return user;
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    const user = await this.userModel.query().patchAndFetchById(id, data);

    return user;
  }

  async remove(id: number): Promise<number> {
    const numDeleted = await this.userModel.query().deleteById(id);

    return numDeleted;
  }
}
