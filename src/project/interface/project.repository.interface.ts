import { Project } from '../project.model';

export namespace ProjectRepositoryInterface {
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

  export abstract class ProjectRepository {
    abstract findAll(): Promise<Project[]>;
    abstract findOne(id: string): Promise<Project>;
    abstract create(project: createProject): Promise<Project>;
    abstract update(project: updateProject): Promise<Project>;
    abstract delete(id: string): Promise<void>;
  }
}
