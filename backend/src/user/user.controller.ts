import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './users.entity';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@Controller('user')
@ApiBearerAuth()
@UseGuards(AuthGuard('admin-token'))
@ApiTags('user administration')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createOne(@Body() user: Partial<User>): Promise<User> {
    return await this.userService.createOne(user);
  }

  @Get(':id')
  @ApiQuery({ name: 'id', type: String })
  async readOne(@Query('id') id: string): Promise<User> {
    return await this.userService.readOne(id);
  }

  @Get()
  async readAll(
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<User[]> {
    return await this.userService.readPage(page, size);
  }

  @Put()
  @ApiQuery({ name: 'id', type: String })
  async updateOne(
    @Query('id') id: string,
    @Body() user: Partial<User>,
  ): Promise<User> {
    return await this.userService.updateOne(id, user);
  }

  @Delete('')
  @ApiQuery({ name: 'id', type: String })
  async deleteOne(@Query('id') id: string): Promise<void> {
    return await this.userService.deleteOne(id);
  }

  @Get('email/')
  @ApiQuery({ name: 'email', type: String })
  async readByEmail(@Query('email') email: string): Promise<User> {
    return await this.userService.readByEmail(email);
  }
}
