import { Module } from '@nestjs/common';
import ConfigService from '@bashleigh/nest-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import BotService from './bot.service';
import UserService from './user.service';

@Module({
  imports: [ConfigService],
  controllers: [],
  providers: [UserService, BotService],
})
export default class BotModule {}
