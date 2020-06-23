import bcrypt from 'bcrypt';
import { ModelOptions, QueryContext } from 'objection';

import { BaseModel } from './base.entity';

const SALT_ROUNDS = 12;

export class User extends BaseModel {
  static tableName = 'users';

  static hidden = ['password'];

  static timestamp = true;

  username: string;

  email: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;

  public async $beforeInsert(ctx: QueryContext): Promise<void> {
    await super.$beforeInsert(ctx);
    await this.generateHash();
  }

  public async $beforeUpdate(
    queryOptions: ModelOptions,
    ctx: QueryContext,
  ): Promise<void> {
    await super.$beforeUpdate(queryOptions, ctx);

    if (queryOptions.patch && this.password === undefined) {
      return;
    }

    await this.generateHash();
  }

  public verifyPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  private async generateHash() {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);

    this.password = hash;
  }
}
