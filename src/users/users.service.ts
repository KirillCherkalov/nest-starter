import { Inject, Injectable } from '@nestjs/common';

import { EmailsService } from 'src/emails/emails.service';
import { ConfigService } from 'src/config/services/config.service';
import { RegisterUserDto } from 'src/common/dto/register-user.dto';

import { User } from '../db/models/user.entity';

import { CreateUserDto } from './dto/create.dto';
import { FindUserDto } from './dto/find.dto';
import { FindUsersDto } from './dto/find-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersResponse } from './dto/users-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('User') private userModel: typeof User,
    private readonly emailsService: EmailsService,
    private readonly configService: ConfigService,
  ) {}

  async findAll(findUserDto: FindUsersDto): Promise<UsersResponse> {
    const { page, pageSize, column, order, columns, search } = findUserDto;
    const query = this.userModel.query().page(page, pageSize);

    if (column && order) {
      query.orderBy(column, order);
    }

    if (columns) {
      query.orderBy(columns);
    }

    if (search) {
      query
        .andWhere('username', 'like', `%${search}%`)
        .orWhere('email', 'like', `%${search}%`);
    }

    const users = await query;

    return users;
  }

  async findOne(findUserDto: FindUserDto): Promise<User> {
    const user = await this.userModel.query().findOne(findUserDto);

    return user;
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const user = await this.userModel.query().insert(registerUserDto);

    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = await this.userModel.query().insert(data);

    await user.generatePasswordResetToken();
    await user.$query().patch();

    this.emailsService.sendMail({
      from: 'effective-soft@team.com',
      to: user.email,
      subject: 'Password set up',
      templateId: 'set-up-password',
      data: {
        username: user.username,
        link: `${this.configService.BASE_FRONTEND_URL}/set-up-password?token=${user.resetPasswordToken}`,
      },
    });

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
