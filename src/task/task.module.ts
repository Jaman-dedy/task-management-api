// src/task/task.module.ts
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task.schema';
import { PassportModule } from '@nestjs/passport';
import { TaskGateway } from './task.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [TaskService, TaskGateway],
  controllers: [TaskController],
})
export class TaskModule {}
