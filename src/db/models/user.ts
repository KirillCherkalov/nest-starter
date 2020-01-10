import bcrypt from 'bcrypt';
import { ModelOptions, QueryContext } from 'objection';

import { BaseModel } from './base';

const SALT_ROUNDS: number = 12;

export class User extends BaseModel {
  static tableName = 'users';

  static hidden = ['password'];

  static timestamp = true;

  username: string;

  email: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;

  public $beforeInsert(ctx: QueryContext) {
    const promise = super.$beforeInsert(ctx);
    return Promise.resolve(promise).then(() => {
      return this.generateHash();
    });
  }

  public $beforeUpdate(queryOptions: ModelOptions, ctx: QueryContext) {
    const promise = super.$beforeUpdate(queryOptions, ctx);
    return Promise.resolve(promise).then(() => {
      if (queryOptions.patch && this.password === undefined) {
        return;
      }
      return this.generateHash();
    });
  }

  public verifyPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  private generateHash(): Promise<void> {
    return bcrypt.hash(this.password, SALT_ROUNDS).then(hash => {
      this.password = hash;
    });
  }
}
