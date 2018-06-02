import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * @param userId: number
   */
  async find(userId: number): Promise<User> {
      return await this.userRepository.findOne({
          where: {
            userId,
          },
      });
  }

  /**
   * @param UserId: number
   */
  async create(UserId: number): Promise<User> {
      const user = this.userRepository.create({
          userId,
      });

      this.userRepository.save(user);

      return user;
  }
}
