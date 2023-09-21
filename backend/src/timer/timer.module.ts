import { Module } from '@nestjs/common';
import { TimerService } from './timer.service';
import { TimerController } from './timer.controller';

@Module({
  providers: [TimerService],
  controllers: [TimerController],
})
export class TimerModule {}
