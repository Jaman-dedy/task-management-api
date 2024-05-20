// src/task/task.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { TaskGateway } from './task.gateway';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    private taskGateway: TaskGateway,
  ) {}

  async create(task: Task): Promise<Task> {
    try {
      const createdTask = new this.taskModel(task);
      return await createdTask.save();
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errors = {};
        for (const field in error.errors) {
          errors[field] = error.errors[field].message;
        }
        throw new BadRequestException({ message: 'Validation error', errors });
      }
      throw error;
    }
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task | null> {
    return this.taskModel.findById(id).exec();
  }

  async update(id: string, task: Task): Promise<Task | null> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, task, { new: true })
      .exec();
    if (updatedTask) {
      this.taskGateway.handleTaskUpdated(updatedTask);
    }
    return updatedTask;
  }

  async delete(id: string): Promise<Task | null> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();
    if (deletedTask) {
      this.taskGateway.handleTaskDeleted(id);
    }
    return deletedTask;
  }
}
