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
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiBody({ type: User })
  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiBody({ type: User })
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
