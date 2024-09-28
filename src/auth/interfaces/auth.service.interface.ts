import { company } from './company.interface';
import { profile_config } from './profile_config.interface';
import { user_config } from './user_config.interface';

export namespace AuthServiceInterface {
  export namespace Inputs {
    export interface Authenticate {
      email: string;
      password: string;
    }

    export interface UserAuth {
      user: {
        id: string;
        name: string;
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
      username: string;
      name: null;
      social_name: null;
      logo: null;
      type: 'PERSON' | 'COMPANY';
      avatar: null;
      cover: null;
      user_config: user_config;
      profile_config: profile_config;
      redirects: [];
      companies: company[];
    }
  }

  export abstract class AuthService {
    abstract me({ user }: Inputs.UserAuth): Promise<Outputs.Me>;
    abstract authenticate(
      credentials: Inputs.Authenticate,
    ): Promise<Outputs.Auth>;
  }
}
