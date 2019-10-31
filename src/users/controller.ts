import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Post()
  create(): string {
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
  update(@Param('id') id: string) {
    return `update ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `remove ${id}`;
  }
}
