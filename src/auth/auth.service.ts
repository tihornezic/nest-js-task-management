import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;

    // first we want to know if user exists with that username
    const user = await this.usersRepository.findOne({ where: { username } });

    // user exists && password is correct
    // first param is input password, second param is the hashed password from the db
    // so what we are doing is we get their non hashed password and hash it,
    // to compare it to the hashed password in the db;
    // if they match, the password that the user has inserted is correct
    // so when you verify a password, you don't decrypt the existing one,
    // you just try to reproduce the correct password using the user's input
    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    } else {
      throw new UnauthorizedException('please check your login credentials');
    }
  }
}
