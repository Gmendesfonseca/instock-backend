export namespace ProjectServiceInterface {
  export namespace Inputs {
    export interface createProject {
      name: string;
      status: string;
      description: string;
      start_date: Date;
      end_date: Date;
      amount: number;
      client: string;
    }

    export interface updateProject {
      id: string;
      name: string;
      status: string;
      description: string;
      start_date: Date;
      end_date: Date;
      amount: number;
      client: string;
    }

    export interface deleteProject {
      id: string;
    }
  }

  export namespace Outputs {
    export interface Project {
      id: string;
      name: string;
      status: string;
      description: string;
      start_date: Date;
      end_date: Date;
      amount: number;
      client: string;
    }
  }

  export abstract class ProjectService {
    abstract findAll(companyId: string): Promise<Outputs.Project[] | null>;
    abstract findOne(id: string): Promise<Outputs.Project | null>;
    abstract create(project: Inputs.createProject): Promise<Outputs.Project>;
    abstract update(project: Inputs.updateProject): Promise<Outputs.Project>;
    abstract delete(id: string): Promise<void>;
  }
}
