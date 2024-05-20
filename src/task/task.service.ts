// src/task/task.service.ts
import { Injectable } from '@nestjs/common';
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
    const createdTask = new this.taskModel(task);
    const savedTask = await createdTask.save();
    this.taskGateway.handleTaskCreated(savedTask);
    return savedTask;
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
