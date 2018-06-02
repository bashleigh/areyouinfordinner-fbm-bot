import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import ConfigService from '@bashleigh/nest-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserModule from './user.module';
import BotModule from './bot.module';

@Module({
  imports: [ConfigService, TypeOrmModule.forRoot(), UserModule, BotModule],
  controllers: [AppController],
  providers: [],
  exports: [UserModule, ConfigService],
})
export class AppModule {}
