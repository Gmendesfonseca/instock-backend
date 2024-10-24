export namespace UserServiceInterface {
  export namespace Inputs {
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
  }

  export namespace Outputs {
    export interface User {
      id: string;
      email: string;
      username: string;
      status: string;
      type: string;
    }
  }

  export abstract class UserService {
    abstract findOne(id: string): Promise<Outputs.User>;
    abstract create(user: Inputs.createUser): Promise<Outputs.User>;
    abstract update(user: Inputs.updateUser): Promise<void>;
    abstract updatePassword(user: Inputs.updatePassword): Promise<void>;
    abstract delete(id: string): Promise<void>;
  }
}
