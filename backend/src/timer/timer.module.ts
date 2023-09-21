import { Module } from '@nestjs/common';
import { TimerService } from './timer.service';
import { TimerController } from './timer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timer } from './timer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Timer])],
  providers: [TimerService],
  controllers: [TimerController],
  exports: [TimerService],
})
export class TimerModule {}
