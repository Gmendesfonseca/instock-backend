import { InjectModel } from '@nestjs/sequelize';
import { Injectable, Logger } from '@nestjs/common';

import { Auth } from '../auth.model';
import { AuthDto } from '../dto/auth.dto';
import { AuthRepositoryInterface } from '../interfaces/auth.repository.interface';

@Injectable()
export class AuthSequelizeRepository
  implements AuthRepositoryInterface.AuthRepository
{
  private readonly logger = new Logger(AuthSequelizeRepository.name);

  constructor(@InjectModel(Auth) private authModel: typeof Auth) {}

  async findOne({ email, password }: AuthDto): Promise<Auth> {
    this.logger.debug('CommentSequelizeRepository.findOne: called');
    return this.authModel.findOne({
      where: { email, password },
      include: [Auth],
    });
  }
}