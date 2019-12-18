import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from './entities/user';
import { UsersService } from './service';
import { CreateUserDto } from './dto/create';
import { ParseIntPipe } from '../common/pipes/parse-int';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    return this.usersService.create(body);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<User> {
    return this.usersService.findOne({ where: { id } });
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: CreateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return `remove ${id}`;
  }
}
