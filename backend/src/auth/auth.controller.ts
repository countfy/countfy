import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto } from './dto/sing-in.dto';
import { SingUpDto } from './dto/sing-up.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: SingInDto) {
    const result = await this.authService.login(user);
    if (result) {
      return result;
    }
    throw new UnauthorizedException();
  }

  @Post('register')
  async register(@Body() user: SingUpDto) {
    const result = await this.authService.register(user);
    if (result) {
      return result;
    }
    throw new InternalServerErrorException();
  }
}
