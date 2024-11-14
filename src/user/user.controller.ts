import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginCredsDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  register(@Body() userData: CreateUserDto) {
    return this.userService.register(userData);
  }
  @Post('login')
  login(@Body() creditentials: LoginCredsDto) {
    return this.userService.login(creditentials);
  }
}