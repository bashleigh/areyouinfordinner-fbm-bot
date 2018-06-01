import create from './create';
import join from './join';

const options = (convo) => {
    convo.ask({
      text: 'How can I help you?',
      quickReplies: [
        {
          content_type: 'text',
          title: 'join a group',
          payload: 'join',
        },
        {
          content_type: 'text',
          title: 'create a group',
          payload: 'create',
        },
      ],
    }, (payload, convo) => {
      console.log(payload);
      if (!payload.message.hasOwnProperty('quick_reply')) {
        convo.say('You don\'t seem to have a group yet', {
          typing: true,
        }).then(() => options(convo));
        return;
      }
      if (payload.message.quick_reply.payload === 'create') {
        create(convo);
      } else if (payload.message.quick_reply.payload === 'join') {
        join(convo);
      } else {
        convo.say('You don\'t seem to have a group yet', {
          typing: true,
        }).then(() => options(convo));
      }
    });
  };

export default (bot) => {
    bot.hear([/start/i, /go/i], (payload, chat) => {

        // TODO authenticate this user with user entity and userId
  
        chat.getUserProfile().then((user) => {
          console.log('user', user);
          chat.say(`Well hello there, ${user.first_name}!`, {
            typing: true,
          }).then(() => {
            chat.say('I\'m a hungry burger! I\'m here to help you and your family prepare for dinner :)', {
              typing: true,
            }).then(() => {
              chat.conversation((convo) => {
                options(convo);
              });
            });
          });
        });
      });
};