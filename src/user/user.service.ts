import { Injectable, Logger } from '@nestjs/common';

import { User } from 'src/user/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSequelizeRepository } from './repositories/user.sequelize.repository';
import { UserRepositoryInterface } from './interfaces/user.sequelize.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly usersRepository: UserRepositoryInterface.UserRepository,
  ) {}

  async findOne(id: string): Promise<User | null> {
    this.logger.debug('UserService.findById: Called');
    return this.usersRepository.findOne(id);
  }

  async create(newUser: CreateUserDto): Promise<User> {
    this.logger.debug('UserService.create: Called');
    return await this.usersRepository.create(newUser);
  }

  async update(id: string, updateUser: UpdateUserDto): Promise<User> {
    this.logger.debug('UserService.update: Called');
    return await this.usersRepository.update({
      id: id,
      username: updateUser.username,
      email: updateUser.email,
    });
  }

  async updatePassword(id: string, password: string): Promise<User> {
    this.logger.debug('UserService.updatePassword: Called');
    return await this.usersRepository.updatePassword({
      id: id,
      password: password,
    });
  }

  async remove(id: string): Promise<void> {
    this.logger.debug('UserService.remove: Called');
    await this.usersRepository.delete(id);
  }
}
