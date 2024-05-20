import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ access_token: string } | null> {
    const user = await this.findOne(username);
    if (user && user.password === password) {
      const payload = { username: user.username };
      const access_token = this.jwtService.sign(payload);
      return { access_token };
    }
    return null;
  }
}
