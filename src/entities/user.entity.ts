import {
  Entity,
  Column,
  Index,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

import Base from './base.entity';
import Group from './group.entity';

@Entity()
export default class User extends Base {
  @Column({
    type: 'bigint',
    unique: true,
  })
  userId: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @ManyToMany(type => Group, group => group.users)
  @JoinTable()
  groups: Group[];
}
