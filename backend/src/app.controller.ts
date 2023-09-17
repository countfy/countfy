import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { UserGuard } from './auth/guards/user.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  @UseGuards(UserGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
