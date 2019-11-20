import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create';

@ApiUseTags('Users')
@Controller('users')
export class UsersController {
  @Post()
  create(@Body() createUserDto: CreateUserDto): string {
    return 'create';
  }

  @Get()
  findAll(): string {
    return 'findAll';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `findOne ${id}`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body) {
    return body;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `remove ${id}`;
  }
}
