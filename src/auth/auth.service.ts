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
  ) {}

  async me({ user }: AuthServiceInterface.Inputs.UserAuth) {
    this.logger.debug('AuthService.me: called');

    const userModel = await this.userRepository.findOne(user.id);
    if (!user) {
      return null;
    }

    const response: AuthServiceInterface.Outputs.Me = {
      user_id: user.id,
      name: userModel.name,
      avatar: userModel.avatar,
      logo: userModel.logo,
      username: userModel.username,
      email: userModel.email,
      type: userModel.type,
      profile_id: userModel.profile_id,
      social_name: userModel.social_name,
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
        created_at: '2024-01-30T13:51:30.626000Z',
        deleted_at: null,
        id: '4edfb04e-aa4d-4d25-b0e0-e32e5df8cc08',
        person_id: '75d4635b-24c8-4783-83e8-5f5ddb55fe95',
        requests_solicitation: 'ALL',
        show_friends: 'ALL',
        updated_at: '2024-01-30T13:51:30.626000Z',
      },
      redirects: [],
      companies: [
        {
          id: '75d4635b-24c8-4783-83e8-5f5ddb55fe95',
          avatar: null,
          user_id: '75d4635b-24c8-4783-83e8-5f5ddb55fe95',
          is_manager_competence: false,
          is_manager_in_check: false,
          logo: null,
          my_collaborator_id: null,
          name: 'Company',
          user: {
            id: user.id,
            username: userModel.username,
          },
        },
      ],
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
      user: {
        id: user.id,
        name: user.username,
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
