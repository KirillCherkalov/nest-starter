import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IUser } from '../../abstracts/entities/user';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
