import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Timer } from './timer.entity';
@Injectable()
export class TimerService {
  private readonly logger: Logger = new Logger(TimerService.name);
  constructor(
    @InjectRepository(Timer)
    private readonly timerRepository: Repository<Timer>,
  ) {}

  public async createOne(timerData: Partial<Timer>): Promise<Timer> {
    const newTimer = new Timer();
    Object.assign(newTimer, timerData);
    await newTimer.save();
    return newTimer;
  }

  public async setTimerEnd(id: string, end_time: Date): Promise<Timer> {
    const timer = await this.readOne(id);
    timer.end_time = end_time;
    await timer.save();
    return timer;
  }

  public async readPage(page: number, size: number): Promise<Timer[]> {
    this.logger.debug(`readPage: page=${page}, size=${size}`);
    const list = await this.timerRepository.find({
      skip: page * size,
      take: size,
    });
    return list;
  }

  public async updateOne(timer: Partial<Timer>): Promise<Timer> {
    const { id } = timer;
    const updatedTimer = await this.readOne(id);
    Object.assign(updatedTimer, timer);
    await updatedTimer.save();
    return updatedTimer;
  }
  public async readOne(id: string): Promise<Timer> {
    const foundTimer = await this.timerRepository.findOneBy({ id });
    return foundTimer;
  }

  public async deleteOne(id: string): Promise<Timer> {
    this.logger.debug(`deleteOne: id=${id}`);
    const deleted = await this.timerRepository.delete(id);
    return deleted.raw;
  }
}
