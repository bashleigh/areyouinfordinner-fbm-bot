import group from './group';
import UserService from './../user.service';

export default (UserService: UserService) => bot => {
  bot.module(group(UserService));
};
