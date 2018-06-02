import { Module } from '@nestjs/common';
import ConfigService from '@bashleigh/nest-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import BotService from './bot.service';
import BotController from './bot.controller';
import UserService from './user.service';
import {
    User,
} from './entities';

@Module({
  imports: [ConfigService, TypeOrmModule.forFeature([
    User,
])],
  controllers: [BotController],
  providers: [UserService, BotService],
})
export default class BotModule {}
