import { Get, Controller, Req, Post, BadRequestException } from '@nestjs/common';
import AppService from './app.service';
import {
  ConfigService,
} from '@bashleigh/nest-config';

@Controller('/messenger')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly config: ConfigService,
) {}

  @Get('webhook')
  verify(@Req() request): Response|BadRequestException {
    if (
      this.config.get('FACEBOOK_VERIFY_TOKEN') !==
      request.query['hub.verify_token']
    ) {
      throw new BadRequestException();
    }
    return request.query['hub.challenge'];
  }

  @Post('webhook')
  webhook(@Req() request) {
    this.appService.messages(request.body);
  }
}
