import { JwtService } from '@nestjs/jwt';
import { Injectable, Logger } from '@nestjs/common';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { AuthRepositoryInterface } from './interfaces/auth.repository.interface';
import { UserRepositoryInterface } from 'src/user/interfaces/user.repository.interface';
import { AuthServiceInterface } from './interfaces/auth.service.interface';

@Injectable()
export class AuthService implements AuthServiceInterface.AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly authRepository: AuthRepositoryInterface.AuthRepository,
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepositoryInterface.UserRepository,
  ) { }

  async me({ user }: AuthServiceInterface.Inputs.UserAuth) {
    this.logger.debug('AuthService.me: called');

    const userModel = await this.userRepository.findOne(user.id);
    if (!user) {
      return null;
    }

    const response: AuthServiceInterface.Outputs.Me = {
      user_id: user.id,
      name: userModel.username,
      avatar: userModel.person.avatar,
      username: userModel.username,
      email: userModel.email,
      type: userModel.type,
      profile_id: userModel.person.id,
      social_name: userModel.person.name,
      user_config: {
        id: user.id,
        user_id: user.id,
        auth2f: false,
        default_language: 'pt-BR',
        default_interface: 'LIGHT',
        schedule_default: null,
        created_at: userModel.createdAt,
        updated_at: userModel.updatedAt,
        deleted_at: null,
        default_timezone: 'America/Sao_Paulo',
        share_my_publications: true,
      },
      profile_config: {
        created_at: userModel.person.createdAt,
        deleted_at: null,
        id: userModel.id,
        person_id: userModel.person.id,
        requests_solicitation: 'ALL',
        show_friends: 'ALL',
        updated_at: userModel.person.updatedAt,
      },
      companies:
      {
        id: userModel.company.id,
        avatar: null,
        user_id: userModel.company.userId,
        is_manager_competence: false,
        is_manager_in_check: false,
        logo: null,
        my_collaborator_id: null,
        name: userModel.company.name,
        user: {
          id: userModel.company.userId,
          username: userModel.username,
        },
      },
    };

    return response;
  }

  async authenticate(authDto: AuthServiceInterface.Inputs.Authenticate) {
    this.logger.debug('AuthService.authenticate: called');

    const auth = await this.authRepository.findOne(authDto);

    if (!auth) {
      return null;
    }

    const user = await this.userRepository.findOne(auth.id);

    if (!user) {
      return null;
    }

    const payload: JwtPayload = {
      sub: user.id,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        type: user.type,
      },
    };

    const response: AuthServiceInterface.Outputs.Auth = {
      access_token: this.jwtService.sign(payload),
      token_type: 'Bearer',
      expires_in: process.env.JWT_EXPIRES_IN,
    };

    return response;
  }
}
