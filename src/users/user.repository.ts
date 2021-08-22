import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  async createUser(createUserDto: CreateUserDto): Promise<{ id: number }> {
    const { username, password } = createUserDto;
    const found = await this.findOne({ username });
    if (found) {
      throw new ConflictException('El username ya existe');
    }
    const user = new User();
    const salt = await bcrypt.genSalt();
    user.username = username;
    user.password = await this.hasPassword(password, salt);
    try {
      await user.save();
    } catch (error) {
      this.logger.error(`Failed to save user "${user.username}"`, error.stack);
      throw new InternalServerErrorException();
    }
    return { id: user.id };
  }
  private hasPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
