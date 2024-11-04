import { User } from '../user.model';
import { UserRepositoryInterface } from '../interfaces/user.repository.interface';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserSequelizeRepository
  implements UserRepositoryInterface.UserRepository {
  private readonly logger = new Logger(UserSequelizeRepository.name);

  constructor(@InjectModel(User) private userModel: typeof User) { }

  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ where: { id } });
  }

  async findOneByCredentials({
    email,
    password,
  }: UserRepositoryInterface.Inputs.findOneByCredentials): Promise<User> {
    this.logger.debug('UserSequelizeRepository.findOneByCredentials: Called');
    return this.userModel.findOne({
      where: { email: email, password: password },
    });
  }

  async create(
    newUser: UserRepositoryInterface.Inputs.createUser,
  ): Promise<User> {
    return this.userModel.create(newUser);
  }

  async update(
    updateUser: UserRepositoryInterface.Inputs.updateUser,
  ): Promise<User> {
    const user = await this.findOne(updateUser.id);
    user.update(updateUser);
    return await user.save();
  }

  async updatePassword(
    updatePassword: UserRepositoryInterface.Inputs.updatePassword,
  ): Promise<User> {
    const user = await this.findOne(updatePassword.id);
    user.password = updatePassword.password;
    return await user.save();
  }

  async delete(id: string): Promise<void> {
    await this.userModel.destroy({ where: { id } });
  }
}
