import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './users.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createOne(@Body() user: Partial<User>): Promise<User> {
    return await this.userService.createOne(user);
  }

  @Get(':id')
  async readOne(@Param('id') id: string): Promise<User> {
    return await this.userService.readOne(id);
  }

  @Get()
  async readAll(
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<User[]> {
    return await this.userService.readPage(page, size);
  }

  @Put(':id')
  async updateOne(
    @Param('id') id: string,
    @Body() user: Partial<User>,
  ): Promise<User> {
    return await this.userService.updateOne(id, user);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string): Promise<void> {
    return await this.userService.deleteOne(id);
  }

  @Get('email/:email')
  async readByEmail(@Param('email') email: string): Promise<User> {
    return await this.userService.readByEmail(email);
  }
}
