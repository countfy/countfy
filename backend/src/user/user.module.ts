import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { BcryptModule } from 'src/bcrypt/bcrypt.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), BcryptModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
