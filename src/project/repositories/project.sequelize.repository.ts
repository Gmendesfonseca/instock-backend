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

  async findAll(companyId: string): Promise<Project[] | undefined> {
    return this.projectModel.findAll({
      where: { deletedAt: null, company: { id: companyId } },
    });
  }

  async findOne(id: string): Promise<Project> {
    return this.projectModel.findOne({ where: { id } });
  }

  async create(
    newProject: ProjectRepositoryInterface.createProject,
  ): Promise<Project> {
    return this.projectModel.create(newProject);
  }

  async update(
    updateProject: ProjectRepositoryInterface.updateProject,
  ): Promise<Project> {
    const project = await this.findOne(updateProject.id);
    project.name = updateProject.name;
    project.status = updateProject.status;
    project.description = updateProject.description;
    project.start_date = updateProject.start_date;
    project.end_date = updateProject.end_date;
    project.amount = updateProject.amount;
    project.client = updateProject.client;
    return await project.save();
  }

  async delete(id: string): Promise<void> {
    await this.projectModel.destroy({ where: { id } });
  }
}
