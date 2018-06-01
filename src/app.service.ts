import { Injectable } from '@nestjs/common';
import * as BootBot from 'bootbot';
import {
  ConfigService,
} from '@bashleigh/nest-config';

@Injectable()
export default class AppService {

  private readonly bot;

  constructor(
    private readonly config: ConfigService,
  ) {
    this.bot = new BootBot({
      AppService: config.get('FACEBOOK_APP_SERVICE'),
      accessToken: this.config.get('FACEBOOK_ACCESS_TOKEN'),
      verifyToken: this.config.get('FACEBOOK_VERIFY_TOKEN'),
    });
  }

  messages = messages => {
    this.bot.handleFacebookData(messages);
  }
}
