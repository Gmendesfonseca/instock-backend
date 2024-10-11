import { company } from './company.interface';
import { user_config } from './user_config.interface';

export namespace AuthServiceInterface {
  export namespace Inputs {
    export interface Authenticate {
      email: string;
      password: string;
    }

    export interface UserAuth {
      sub: string;
      exp?: number;
      user: {
        id: string;
        username: string;
        email: string;
        type: string;
      };
    }
  }

  export namespace Outputs {
    export interface Auth {
      access_token: string;
      expires_in: string;
      token_type: string;
    }

    export interface Me {
      user_id: string;
      avatar: string;
      name: string;
      username: string;
      social_name: string;
      email: string;
      type: string;
      profile_id: string;
      user_config: user_config;
      profile_config: profile_config_company | profile_config_person;
      companies: company;
    }
  }

  export abstract class AuthService {
    abstract me({ user }: Inputs.UserAuth): Promise<Outputs.Me>;
    abstract authenticate(
      credentials: Inputs.Authenticate,
    ): Promise<Outputs.Auth>;
  }
}
