import { InjectModel } from '@nestjs/sequelize';
import { Injectable, Logger } from '@nestjs/common';

import { User } from 'src/user/user.model';
import { AuthenticateDto } from '../dto/authenticate.dto';
import { AuthRepositoryInterface } from '../interfaces/auth.repository.interface';

@Injectable()
export class AuthSequelizeRepository
  implements AuthRepositoryInterface.AuthRepository
{
  private readonly logger = new Logger(AuthSequelizeRepository.name);

  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findOne({ email, password }: AuthenticateDto): Promise<User> {
    this.logger.debug('CommentSequelizeRepository.findOne: called');
    return this.userModel.findOne({
      where: { email, password },
      include: [User],
    });
  }
}
