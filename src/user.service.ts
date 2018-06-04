import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async find(userId: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        userId,
      },
    });
  }

  async create(fbUser): Promise<User> {
   return await this.userRepository.save(this.userRepository.create({
        userId: fbUser.id,
        firstname: fbUser.first_name,
        lastname: fbUser.last_name,
      }));
  }

  async update(fbUser, user): Promise<User> {
    return await this.userRepository.save({
        ...user,
        ...{
            firstname: fbUser.first_name,
            lastname: fbUser.last_name,
        },
    });
   }
}
