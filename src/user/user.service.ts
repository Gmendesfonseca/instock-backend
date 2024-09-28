import { Injectable, Logger } from '@nestjs/common';

import { User } from 'src/user/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepositoryInterface } from './interfaces/user.repository.interface';
import { UserServiceInterface } from './interfaces/user.service.interface';

@Injectable()
export class UserService implements UserServiceInterface.UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly usersRepository: UserRepositoryInterface.UserRepository,
  ) {}

  async findOne(id: string): Promise<User | null> {
    this.logger.debug('UserService.findById: Called');
    return this.usersRepository.findOne(id);
  }

  async create(newUser: UserServiceInterface.Inputs.createUser): Promise<User> {
    this.logger.debug('UserService.create: Called');
    return await this.usersRepository.create(newUser);
  }

  async update(
    updateUser: UserServiceInterface.Inputs.updateUser,
  ): Promise<UserServiceInterface.Outputs.User> {
    this.logger.debug('UserService.update: Called');
    return await this.usersRepository.update(updateUser);
  }

  async updatePassword(
    input: UserServiceInterface.Inputs.updatePassword,
  ): Promise<UserServiceInterface.Outputs.User> {
    this.logger.debug('UserService.updatePassword: Called');
    return await this.usersRepository.updatePassword(input);
  }

  async delete(id: string): Promise<void> {
    this.logger.debug('UserService.remove: Called');
    await this.usersRepository.delete(id);
  }
}
