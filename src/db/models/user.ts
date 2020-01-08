import { BaseModel } from './base';

export class User extends BaseModel {
  static tableName = 'users';

  static hidden = ['password'];

  // static timestamp = true;

  username: string;

  email: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;
}
