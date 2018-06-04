import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Group, User } from './../entities';
import { Repository } from 'typeorm';
import * as randomstring from 'randomstring';

@Injectable()
export default class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async create(name, user): Promise<Group> {
    const group = this.groupRepository.create({
      name,
      code: randomstring.generate(),
    });

    group.users = [user];

    return await this.groupRepository.save(group);
  }

  async findByUser(user: User): Promise<Group[]> {
    return await this.groupRepository.find({
      relations: ['users'],
      where: qb => '`Group_users`.id = ' + user.id,
      order: {
        name: 'ASC',
        id: 'DESC',
      },
    });
  }
}
