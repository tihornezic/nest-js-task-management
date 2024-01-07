import { Injectable, NotFoundException } from '@nestjs/common';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

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
  // commented out when connected to a real database
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;

  //   // define a temporary array to hold the result
  //   let tasks = this.getAllTasks();

  //   // do something with status
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   // do something with search
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }

  //       return false;
  //     });
  //   }

  //   // return final result
  //   return tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id: id } });

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found.`);
    }

    return found;
  }

  // getTaskById(id: string): Task {
  //   const found = this.tasks.find((task) => task.id === id);

  //   if (!found) {
  //     // you can provide a custom error message
  //     throw new NotFoundException(`Task with ID ${id} not found.`);
  //   }

  //   return found;
  // }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;

  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);

  //   return task;
  // }

  async deleteTask(id: string): Promise<void> {
    // delete does not check that the entity exists in the db beforehand
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Tash with ID "${id}" not found`);
    }
  }

  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);

  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;

    await this.tasksRepository.save(task);

    return task;
  }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const taskToUpdate = this.getTaskById(id);

  //   taskToUpdate.status = status;

  //   return taskToUpdate;
  // }
}
