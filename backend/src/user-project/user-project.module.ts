import { Module } from '@nestjs/common';
import { UserProjectService } from './user-project.service';
import { UserProjectController } from './user-project.controller';
import { UserProject } from './user-project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserProject])],
  providers: [UserProjectService],
  controllers: [UserProjectController],
  exports: [UserProjectService],
})
export class UserProjectModule {}
