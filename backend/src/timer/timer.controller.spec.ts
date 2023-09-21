import { Test, TestingModule } from '@nestjs/testing';
import { TimerController } from './timer.controller';

describe('TimerController', () => {
  let controller: TimerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimerController],
    }).compile();

    controller = module.get<TimerController>(TimerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
