import { Auth } from 'src/auth/auth.model';

export namespace AuthRepositoryInterface {
  export interface Authenticate {
    email: string;
    password: string;
  }

  export abstract class AuthRepository {
    abstract findOne(credentials: Authenticate): Promise<Auth>;
  }
}
