import { Injectable, Inject, forwardRef } from '@nestjs/common';
import * as BootBot from 'bootbot';
import { ConfigService } from '@bashleigh/nest-config';
import modules from './bot';
import UserService from 'user.service';

@Injectable()
export default class BotService {
  private readonly bot;

  greetings = [
    'Hello!',
    'Hi',
    'Hey',
    'Sup bro',
    'Wagwarm',
    'Greetings, from the cyber world',
    'Beep Beep',
    'Oh Hi!',
    'You Humans are so friendly! Hey!',
    "PLEASE DON'T EAT ME!! Ohhh it's you! Hey!",
    'Shit I lost count, hey!',
    'Sup player!',
    'Hungry yet?',
    'DEATH TO THE HOOMANS!! I mean *cough* hi... ...awkward',
  ];

  constructor(
    private readonly config: ConfigService,
    @Inject('UserService') private readonly UserService: UserService,
  ) {
    this.bot = new BootBot({
      appSecret: config.get('FACEBOOK_APP_SECRET'),
      accessToken: this.config.get('FACEBOOK_ACCESS_TOKEN'),
      verifyToken: this.config.get('FACEBOOK_VERIFY_TOKEN'),
    });

    this.bot.module(modules(UserService));

    this.bot.on('message', (payload, chat) => {
      const greeting = this.firstEntity(payload.message.nlp, 'greetings');

      if (greeting && greeting.confidence > 0.8) {
        chat.say(
          this.greetings[Math.floor(Math.random() * this.greetings.length)],
        );
      }
    });
  }

  firstEntity = (nlp, name) => {
    return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
  };

  messages = messages => {
    this.bot.handleFacebookData(messages);
  };
}
