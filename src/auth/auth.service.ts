import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';
import { Injectable, Logger } from '@nestjs/common';

import { AuthDto } from './dto/auth.dto';
import { User } from 'src/user/user.model';
import { GenerateAuthDto } from './dto/generate-auth.dto';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { AuthRepositoryInterface } from './interfaces/auth.repository.interface';
import { UserRepositoryInterface } from 'src/user/interfaces/user.sequelize.repository';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly AuthRepository: AuthRepositoryInterface.AuthRepository,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepositoryInterface.UserRepository,
  ) {}

  async authenticate(auth: AuthDto) {
    this.logger.debug('AuthService.authenticate: called');
    const user = await this.AuthRepository.findOne(auth);
    return user.id;
  }

  async generateAuth(userId: string) {
    this.logger.debug('AuthService.generateAuth: called');
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      return null;
    }

    const type = (user: User) => {
      if (user.person) 'person';
      if (user.company) 'company';
      return 'user';
    };

    const payload: JwtPayload = {
      user: {
        id: user.id,
        name: user.username,
        email: user.email,
        type: type(user),
      },
    };

    const response = {
      token_type: 'Bearer',
      access_token: this.jwtService.sign(payload),
      expires_in: process.env.JWT_EXPIRES_IN,
    };

    return plainToClass(GenerateAuthDto, response, {
      excludeExtraneousValues: true,
    });
  }
}
