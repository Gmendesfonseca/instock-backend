import { User } from 'src/user/user.model';
export namespace AuthRepositoryInterface {
  export interface Authenticate {
    email: string;
    password: string;
  }

  export abstract class AuthRepository {
    abstract findOne(credentials: Authenticate): Promise<User>;
  }
}
