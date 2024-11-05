import { Injectable, Logger } from '@nestjs/common';
import { ProjectRepositoryInterface } from '../interface/project.repository.interface';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from '../project.model';

@Injectable()
export class ProjectSequelizeRepository
  implements ProjectRepositoryInterface.ProjectRepository
{
  private readonly logger = new Logger(ProjectSequelizeRepository.name);
  constructor(@InjectModel(Project) private projectModel: typeof Project) {}

  async findAll(companyId: string): Promise<Project[] | null> {
    return this.projectModel.findAll({
      where: { deletedAt: null, company: { id: companyId } },
    });
  }

  async findOne(id: string): Promise<Project | null> {
    return this.projectModel.findOne({ where: { id } });
  }

  async create(
    newProject: ProjectRepositoryInterface.Inputs.createProject,
  ): Promise<Project> {
    return this.projectModel.create(newProject);
  }

  async update(
    updateProject: ProjectRepositoryInterface.Inputs.updateProject,
  ): Promise<Project> {
    const project = await this.findOne(updateProject.id);
    return await project.update(updateProject);
  }

  async delete(id: string): Promise<void> {
    await this.projectModel.destroy({ where: { id } });
  }
}
