import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../users/user.entity';
import { TaskDto } from './dto/tasks.dto';
import { TaskStatusDto } from './dto/task-status.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {}
  async getTaskById(id: number, user: User): Promise<TaskDto> {
    const found = await this.taskRepository.findOne({ id, userId: user.id });
    if (!found) {
      throw new NotFoundException(`La tarea con el "${id}" no fue encontrada`);
    }
    return found;
  }
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }
  async deleteTaskById(id: number, user: User): Promise<void> {
    const deleteResult = await this.taskRepository.delete({
      id,
      userId: user.id,
    });
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`La tarea con el "${id}" no fue encontrada`);
    }
  }
  async updateStatusTask(
    id: number,
    taskStatusDto: TaskStatusDto,
    user: User,
  ): Promise<Task> {
    const task = (await this.getTaskById(id, user)) as Task;
    task.status = taskStatusDto.status;
    return await task.save();
  }

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<TaskDto[]> {
    return this.taskRepository.getTasks(filterDto, user);
  }
}
