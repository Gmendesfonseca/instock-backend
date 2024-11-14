import { Project } from '../project.model';

export namespace ProjectRepositoryInterface {
  export namespace Inputs {
    export interface createProject {
      name: string;
      status: string;
      description: string;
      start_date: string;
      end_date: string;
      amount: number;
      client: string;
    }

    export interface createProjectItem {
      amount: number;
      product_id: string;
    }

    export interface updateProject {
      id: string;
      name: string;
      status: string;
      description: string;
      start_date: string;
      end_date: string;
      amount: number;
      client: string;
    }

    export interface deleteProject {
      id: string;
    }
  }
  export abstract class ProjectRepository {
    abstract findAll(companyId: string): Promise<Project[] | null>;
    abstract findOne(id: string): Promise<Project | null>;
    abstract create(
      project: Inputs.createProject,
      items: Inputs.createProjectItem[],
    ): Promise<Project>;
    abstract update(project: Inputs.updateProject): Promise<Project>;
    abstract delete(id: string): Promise<void>;
  }
}
