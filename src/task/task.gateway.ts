// src/task/task.gateway.ts
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Task } from './task.schema';

@WebSocketGateway()
export class TaskGateway {
  @WebSocketServer()
  server: Server;

  async handleTaskCreated(task: Task) {
    this.server.emit('taskCreated', task);
  }

  async handleTaskUpdated(task: Task) {
    this.server.emit('taskUpdated', task);
  }

  async handleTaskDeleted(taskId: string) {
    this.server.emit('taskDeleted', taskId);
  }
}
