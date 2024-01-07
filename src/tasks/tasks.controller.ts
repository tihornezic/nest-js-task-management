import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

// a controller's job is only to simply receive a request,
// delegate it to whatever its needed to achieve the goal,
// and then return the response
@Controller('tasks')
export class TasksController {
  // although this works, there is a better (cleaner) to do it
  /* // define property
  tasksService: TasksService;

  // injected TasksService into our controller
  constructor(tasksService: TasksService) {
    // assign it to become a property of our class
    this.tasksService = tasksService;
  }

  helloWorld() {
    this.tasksService.doSomething();
  } */

  // the cleaner way to do it

  // injected TasksService into our controller
  // private makes it a private PROPERTY of this class
  constructor(private tasksService: TasksService) {}

  /* helloWorld() {
    // because tasksService is a private PROPERTY,
    // we can use as this within the same class
    this.tasksService.doSomething();
  } */

  // whenever you GET request to /tasks
  // let the getAllTasks() handler method handle it
  // http://localhost:3000/tasks
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  // // http://localhost:3000/tasks/1230897xsb1
  // // : means it will be a PATH PARAMETER
  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;

    return this.tasksService.updateTaskStatus(id, status);
  }
}
