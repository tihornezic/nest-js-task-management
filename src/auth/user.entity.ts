import { Task } from 'src/tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // one to many
  // one user to many tasks
  // eager => when you have a relation,
  // one of the side of the relation can be eager;
  // when eager is set to true, that means whenever you
  // retrieve an object from the db, whenever we fetch the user,
  // we are also going to fetch the tasks with it;
  // we don't have to manually fetch tasks in a separate db call
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
