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
  })
  userId: number;

  @ManyToMany(type => Group, group => group.users)
  @JoinTable()
  groups: Group[];
}
