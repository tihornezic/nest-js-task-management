import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  // good practice for using private
  // minimizing room for error
  // commented out when connected to a real database
  // private tasks: Task[] = [];

  constructor(
    @InjectRepository(TasksRepository)
    private readonly tasksRepository: TasksRepository,
  ) {}

  // a method is just a function in a class
  // by default when defining a method
  // for a class is public

  getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({
      where: { id: id, user: user },
    });

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: string): Promise<void> {
    // delete does not check that the entity exists in the db beforehand
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Tash with ID "${id}" not found`);
    }
  }

  // async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  //   const task = await this.getTaskById(id);

  //   task.status = status;

  //   await this.tasksRepository.save(task);

  //   return task;
  // }
}
