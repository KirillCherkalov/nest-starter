import bcrypt from 'bcrypt';
import { ModelOptions, QueryContext } from 'objection';
import { add, isAfter } from 'date-fns';

import { BaseModel } from './base.entity';

const SALT_ROUNDS = 12;

export class User extends BaseModel {
  static tableName = 'users';

  static hidden = ['password', 'resetPasswordExpiresAt', 'resetPasswordToken'];

  static timestamp = true;

  username: string;

  email: string;

  password: string;

  resetPasswordToken: string;

  resetPasswordExpiresAt: Date;

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

  public isPasswordResetTokenValid(): boolean {
    return isAfter(this.resetPasswordExpiresAt, new Date());
  }

  public async generatePasswordResetToken(): Promise<void> {
    this.resetPasswordToken = await bcrypt.hash(this.email, SALT_ROUNDS);
    this.resetPasswordExpiresAt = add(new Date(), { days: 1 });
  }

  private async generateHash() {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);

    this.password = hash;
  }
}
