import { Injectable, Logger } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthRepositoryInterface } from './interfaces/auth.repository.interface';
import { plainToClass } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.model';
import { GenerateAuthDto } from './dto/generate-auth.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly AuthRepository: AuthRepositoryInterface.AuthRepository,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async authenticate(auth: AuthDto) {
    this.logger.debug('AuthService.authenticate: called');
    const user = await this.AuthRepository.findOne(auth);
    return user.id;
  }

  async generateAuth(userId: string) {
    this.logger.debug('AuthService.generateAuth: called');
    const user = await this.userService.findById(userId);

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
        name: user.firstName,
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
