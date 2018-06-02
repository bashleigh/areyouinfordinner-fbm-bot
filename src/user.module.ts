import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import ConfigService from '@bashleigh/nest-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserService from './user.service';
import {
    User,
} from './entities';

@Module({
  imports: [ConfigService, TypeOrmModule.forFeature([
      User,
  ])],
  controllers: [],
  providers: [{
      provide: 'UserService',
      useValue: UserService,
  }],
})
export default class UserModule {}
