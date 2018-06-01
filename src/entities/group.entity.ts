import {
  Entity,
  Column,
  Index,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import Base from './base.entity';
import User from './user.entity';

@Entity()
export default class Group extends Base {
  @Column() name: string;

  @Column({
    default: 1,
  })
  isActive: boolean;

  @Column()
  @Index({
    unique: true,
  })
  code: string;

  @ManyToMany(type => User, user => user.groups)
  @JoinTable()
  users: User[];
}
