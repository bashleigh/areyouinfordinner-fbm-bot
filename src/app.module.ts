import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import AppService from './app.service';
import ConfigService from '@bashleigh/nest-config';

@Module({
  imports: [ConfigService],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
