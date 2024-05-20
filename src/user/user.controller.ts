// src/user/user.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Post('login')
  async login(@Body() user: User): Promise<{ access_token: string } | null> {
    return this.userService.login(user.username, user.password);
  }
}
