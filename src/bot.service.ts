import { Injectable, Inject, forwardRef } from '@nestjs/common';
import * as BootBot from 'bootbot';
import { ConfigService } from '@bashleigh/nest-config';
import modules from './bot';
import UserService from 'user.service';
import { GroupService } from './group';

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
    'Hey Human',
  ];

  creating = [
    'Doing the tings',
    'Loading... ...stand by',
    'Creating',
    'Starting that now',
  ];

  groupFetching = ['Fetching now'];

  success = [];

  constructor(
    private readonly config: ConfigService,
    @Inject('UserService') private readonly UserService: UserService,
    private readonly GroupService: GroupService,
  ) {
    this.bot = new BootBot({
      appSecret: config.get('FACEBOOK_APP_SECRET'),
      accessToken: this.config.get('FACEBOOK_ACCESS_TOKEN'),
      verifyToken: this.config.get('FACEBOOK_VERIFY_TOKEN'),
    });

    this.bot.on('message', (payload, chat) => {
      chat.getUserProfile().then(async fbUser => {
        const user = await this.resolveUser(fbUser);

        const greeting = this.firstEntity(payload.message.nlp, 'greetings');
        if (greeting && greeting.confidence > 0.8) {
          chat
            .say(
              this.greetings[Math.floor(Math.random() * this.greetings.length)],
              {
                typing: true,
              },
            )
            .then(() => {
              this.determineAction(payload, chat, user);
            });
        } else {
          this.determineAction(payload, chat, user);
        }
      });
    });
  }

  determineAction = (payload, chat, user) => {
    const intent = this.firstEntity(payload.message.nlp, 'intent');
    switch (intent.value) {
      case 'dinner_status':
        this.status(intent, payload, chat, user);
        break;
      case 'create_group':
        this.creation(intent, payload, chat, user);
        break;
      case 'join_group':
        this.join(intent, payload, chat, user);
        break;
      case 'group_leave':
        this.leave(intent, payload, chat, user);
        break;
      case 'list_groups':
        this.list(intent, payload, chat, user);
        break;
      case 'default_group':
        this.setDefaultGroup(intent, payload, chat, user);
        break;
      case 'dinner_response':
        this.response(intent, payload, chat, user);
        break;
      default:
        chat.say('me no understand');
    }
  };

  status = (intent, payload, chat, user) => {
    if (intent && intent.value === 'dinner_status' && intent.confidence > 0.7) {
      const recipient = this.firstEntity(payload.message.nlp, 'recipient');
      const datetime = this.firstEntity(payload.message.nlp, 'datetime');

      if (recipient.value === 'all' && recipient.confidence > 0.7) {
        chat.say('check dinner status for all people');
      } else if (recipient.value === 'self' && recipient.confidence > 0.7) {
        chat.say('check dinner status for self');
      }
    }
  };

  creation = (intent, payload, chat, user) => {
    chat.conversation(convo => {
      convo.ask(
        'what do you want to call it?',
        async (payload, convo) => {
          if (payload.message.text === 'cancel') {
            convo.end();
            return;
          } else {
            const group = await this.GroupService.create(
              payload.message.text,
              user,
            );
            convo.say(`cool, create a group called ${group.name}`);
            convo.end();
          }
        },
        {
          typing: true,
        },
      );
    });
  };

  join = (intent, payload, chat, user) => {};

  leave = (intent, payload, chat, user) => {};

  response = (intent, payload, chat, user) => {};

  list = async (intent, payload, chat, user) => {
    const groups = await this.GroupService.findByUser(user);
    groups.forEach(group => chat.say(group.name));
  };

  setDefaultGroup = async (intent, payload, chat, user) => {
    const groups = await this.GroupService.findByUser(user);
    console.log(
      'quickreplies',
      groups.map(group => ({
        text: group.name,
        payload: group.id,
      })),
    );
    chat.conversation(convo => {
      convo.ask(
        {
          text: 'pick one of your groups to set as default',
          quickReplies: groups.map(group => ({
            content_type: 'text',
            title: group.name,
            payload: group.id,
          })),
        },
        async (payload, convo) => {
          if (
            !payload.message.hasOwnProperty('quick_reply') ||
            !payload.message.quick_reply.hasOwnProperty('payload')
          ) {
            convo.end();
            return;
          }

          await this.UserService.update({
            ...user,
            defaultGroupId: payload.message.quick_reply.payload,
          });

          convo.say('Updated');
          convo.end();
        },
        {
          typing: true,
        },
      );
    });
  };

  resolveUser = async fbUser => {
    let localUser = await this.UserService.find(fbUser.id);

    if (!localUser) {
      localUser = await this.UserService.create(fbUser);
    } else {
      localUser = await this.UserService.updateFB(fbUser, localUser);
    }
    return localUser;
  };

  firstEntity = (nlp, name) => {
    return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
  };

  messages = messages => {
    this.bot.handleFacebookData(messages);
  };
}
