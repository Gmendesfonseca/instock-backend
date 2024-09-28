import { User } from '../user.model';

export namespace UserRepositoryInterface {
  export interface createUser {
    email: string;
    password: string;
    username: string;
    status: string;
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

  export interface deleteUser {
    id: string;
  }

  export abstract class UserRepository {
    abstract findOne(id: string): Promise<User>;
    abstract create(user: createUser): Promise<User>;
    abstract update(user: updateUser): Promise<User>;
    abstract updatePassword(user: updatePassword): Promise<User>;
    abstract delete(id: string): Promise<void>;
  }
}
