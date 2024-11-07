import { Injectable, Logger } from '@nestjs/common';
import { ProjectServiceInterface } from './interface/project.service.interface';
import { ProjectRepositoryInterface } from './interface/project.repository.interface';

@Injectable()
export class ProjectService implements ProjectServiceInterface.ProjectService {
  private readonly logger = new Logger(ProjectService.name);

  constructor(
    private readonly projectRepository: ProjectRepositoryInterface.ProjectRepository,
  ) {}

  async findAll(
    companyId: string,
  ): Promise<ProjectServiceInterface.Outputs.Project[] | null> {
    this.logger.debug('ProjectService.findAll: Called');
    return this.projectRepository.findAll(companyId);
  }

  async findOne(
    id: string,
  ): Promise<ProjectServiceInterface.Outputs.Project | null> {
    this.logger.debug('ProjectService.findOne: Called');
    return this.projectRepository.findOne(id);
  }

  async create(newProject: ProjectServiceInterface.Inputs.createProject) {
    this.logger.debug('ProjectService.create: Called');
    return this.projectRepository.create(newProject);
  }

  async update(updateProject: ProjectServiceInterface.Inputs.updateProject) {
    this.logger.debug('ProjectService.update: Called');
    return this.projectRepository.update(updateProject);
  }

  async delete(id: string) {
    this.logger.debug('ProjectService.delete: Called');
    return this.projectRepository.delete(id);
  }
}
