import { Test, TestingModule } from '@nestjs/testing';
import { UserProjectController } from './user-project.controller';

describe('UserProjectController', () => {
  let controller: UserProjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserProjectController],
    }).compile();

    controller = module.get<UserProjectController>(UserProjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
