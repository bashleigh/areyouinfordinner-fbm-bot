import group from './group';
import UserService from './../user.service';

export default (UserService: UserService) => bot => {
  console.log('userservice', UserService);
  bot.module(group(UserService));
};
