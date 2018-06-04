import { Module } from '@nestjs/common';
import GroupService from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'entities';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  providers: [GroupService],
  exports: [GroupService],
})
export default class GroupModule {}
