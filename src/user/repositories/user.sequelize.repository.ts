import { User } from '../user.model';
import { UserRepositoryInterface } from '../interfaces/user.sequelize.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserSequelizeRepository
  implements UserRepositoryInterface.UserRepository
{
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ where: { id } });
  }

  async create(newUser: UserRepositoryInterface.createUser): Promise<User> {
    return this.userModel.create(newUser);
  }

  async update(updateUser: UserRepositoryInterface.updateUser): Promise<User> {
    const user = await this.findOne(updateUser.id);
    user.username = updateUser.username;
    user.email = updateUser.email;
    return await user.save();
  }

  async updatePassword(
    updatePassword: UserRepositoryInterface.updatePassword,
  ): Promise<User> {
    const user = await this.findOne(updatePassword.id);
    user.password = updatePassword.password;
    return await user.save();
  }

  async delete(id: string): Promise<void> {
    await this.userModel.destroy({ where: { id } });
  }
}
