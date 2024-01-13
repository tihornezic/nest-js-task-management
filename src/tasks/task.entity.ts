import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;

  // you can have many tasks for one user
  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  // whenever we return the json response, we're going to
  // exclude the user property
  @Exclude({ toPlainOnly: true })
  user: User;
}
