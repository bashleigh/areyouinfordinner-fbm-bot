import { Entity, Column, ManyToMany } from 'typeorm';

import Base from './base.entity';
import Group from './group.entity';

@Entity()
export default class User extends Base {
  @Column({
    type: 'bigint',
    unique: true,
  })
  userId: number;

  @Column() firstname: string;

  @Column() lastname: string;

  @Column({
    nullable: true,
  })
  defaultGroupId: number = null;

  @ManyToMany(type => Group, group => group.users)
  groups: Group[];
}
