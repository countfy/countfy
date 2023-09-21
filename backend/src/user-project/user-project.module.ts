import { Module } from '@nestjs/common';
import { UserProjectService } from './user-project.service';
import { UserProjectController } from './user-project.controller';

@Module({
  providers: [UserProjectService],
  controllers: [UserProjectController],
})
export class UserProjectModule {}
