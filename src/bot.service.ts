import { Injectable, Inject, forwardRef } from '@nestjs/common';
import * as BootBot from 'bootbot';
import { ConfigService } from '@bashleigh/nest-config';
import modules from './bot';
import UserService from 'user.service';

@Injectable()
export default class BotService {
  private readonly bot;

  constructor(private readonly config: ConfigService, @Inject('UserService') private readonly UserService: UserService) {
    this.bot = new BootBot({
      appSecret: config.get('FACEBOOK_APP_SECRET'),
      accessToken: this.config.get('FACEBOOK_ACCESS_TOKEN'),
      verifyToken: this.config.get('FACEBOOK_VERIFY_TOKEN'),
    });

    this.bot.module(modules(UserService));
  }

  messages = messages => {
    this.bot.handleFacebookData(messages);
  }
}
