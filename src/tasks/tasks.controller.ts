import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

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
  // commented out when connected to a real database
  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
  //   // if we have any filters defined, call tasksService.getTasksWithFilters
  //   // otherwise, just get all tasks

  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilters(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

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

  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): void {
  //   // return this.tasksService.deleteTask(id);
  //   // without return works as well
  //   this.tasksService.deleteTask(id);
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   // @Body('status') status: TaskStatus,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ): Task {
  //   const { status } = updateTaskStatusDto;

  //   return this.tasksService.updateTaskStatus(id, status);
  // }
}
