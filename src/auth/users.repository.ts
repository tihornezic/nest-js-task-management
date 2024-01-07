import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';

// repository is place where you do your complex db interactions
@Injectable()
export class UsersRepository extends Repository<User> {
  //
}
