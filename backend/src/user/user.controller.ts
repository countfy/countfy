import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './users.entity';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
@Controller('user')
@ApiBearerAuth()
@UseGuards(AdminGuard)
@ApiTags('user administration')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createOne(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.createOne(user);
  }

  @Get()
  @ApiQuery({ name: 'id', type: String })
  async readOne(@Query('id') id: string): Promise<User> {
    return await this.userService.readOne(id);
  }

  @Get('page')
  @ApiQuery({ name: 'page', type: Number, example: 1 })
  @ApiQuery({ name: 'size', type: Number, example: 10 })
  async readPage(
    @Query('page') page: number,
    @Query('size') size: number,
  ): Promise<User[]> {
    return await this.userService.readPage(page, size);
  }

  @Put()
  @ApiQuery({ name: 'id', type: String })
  async updateOne(
    @Query('id') id: string,
    @Body() user: UpdateUserDTO,
  ): Promise<User> {
    return await this.userService.updateOne(id, user);
  }

  @Delete()
  @ApiQuery({ name: 'id', type: String })
  async deleteOne(@Query('id') id: string): Promise<User> {
    return await this.userService.deleteOne(id);
  }

  @Get('email')
  @ApiQuery({ name: 'email', type: String })
  async readByEmail(@Query('email') email: string): Promise<User> {
    return await this.userService.readByEmail(email);
  }
}
