import { User } from '../user.model';

export namespace UserRepositoryInterface {
  export namespace Inputs {
    export interface findOneByCredentials {
      email: string;
      password: string;
    }
    export interface createUser {
      email: string;
      password: string;
      username: string;
      type: string;
    }

    export interface updateUser {
      id: string;
      username: string;
      email: string;
    }

    export interface updatePassword {
      id: string;
      password: string;
    }
  }

  export abstract class UserRepository {
    abstract findOne(id: string): Promise<User>;
    abstract findOneByCredentials(
      credentials: Inputs.findOneByCredentials,
    ): Promise<User>;
    abstract create(user: Inputs.createUser): Promise<User>;
    abstract update(user: Inputs.updateUser): Promise<User>;
    abstract updatePassword(user: Inputs.updatePassword): Promise<User>;
    abstract delete(id: string): Promise<void>;
  }
}
