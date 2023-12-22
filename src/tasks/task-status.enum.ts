// we can define a model as a class or as an interface
// after compilation interfaces are not preserved anymore
// but classes will be preserved
// classes are useful when you want to create multiple instances
// of the same shape following a blueprint and when you also
// want to enhance those with self-contained functionality using methods

/* export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
} */

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
