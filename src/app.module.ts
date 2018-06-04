import { Module } from '@nestjs/common';
import ConfigService from '@bashleigh/nest-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import BotModule from './bot.module';
import GroupModule from './group';

@Module({
  imports: [ConfigService, TypeOrmModule.forRoot(), GroupModule, BotModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
