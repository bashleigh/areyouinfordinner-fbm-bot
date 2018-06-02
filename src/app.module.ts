import { Module } from '@nestjs/common';
import ConfigService from '@bashleigh/nest-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import BotModule from './bot.module';

@Module({
  imports: [ConfigService, TypeOrmModule.forRoot(), BotModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
