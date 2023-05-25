import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ActualUser } from './authentication/decorators/actual-user.decorator';
import { User } from './user/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@ActualUser() user: User): string {
    return user.username;
  }
}
