// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/task-management'),
    UserModule,
    TaskModule,
  ],
})
export class AppModule {}
