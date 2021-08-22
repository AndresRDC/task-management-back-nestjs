import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { UserIdDto } from '../auth/dto/user-id.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<UserIdDto> {
    return this.userRepository.createUser(createUserDto);
  }
  async getUserByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ username });
  }
}
