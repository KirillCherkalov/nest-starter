import { Module } from '@nestjs/common';

import { UsersController } from './controller';
import { UsersService } from './service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
