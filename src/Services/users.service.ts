import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entities/user.entity';
import { CreateUser } from 'src/DTO/User/CreateDTO';
import { UpdateUser } from 'src/DTO/User/UpdateDto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(newUser: CreateUser): Promise<User> {
    const user = new User(
      uuidv4(),
      newUser.email,
      newUser.password,
      newUser.firstName,
      newUser.lastName,
    );
    return await this.usersRepository.save(user);
  }

  async update(id: string, updateUser: UpdateUser): Promise<User> {
    const user = await this.findOne(id);
    user.firstName = updateUser.firstName;
    user.lastName = updateUser.lastName;
    return await this.usersRepository.save(user);
  }

  async updatePassword(id: string, password: string): Promise<User> {
    const user = await this.findOne(id);
    user.password = password;
    return await this.usersRepository.save(user);
  }

  async updateEmail(id: string, email: string): Promise<User> {
    const user = await this.findOne(id);
    user.email = email;
    return await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
