// src/user/user.controller.ts
import {
  Controller,
  Post,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
  async login(@Body() user: User): Promise<{ access_token: string }> {
    try {
      return await this.userService.login(user.username, user.password);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new BadRequestException('Invalid credentials');
      }
      throw error;
    }
  }
}
