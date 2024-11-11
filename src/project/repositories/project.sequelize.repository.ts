import { Injectable, Logger } from '@nestjs/common';
import { ProjectRepositoryInterface } from '../interface/project.repository.interface';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from '../project.model';
import { ProjectProduct } from 'src/project-product/product-project.model';

@Injectable()
export class ProjectSequelizeRepository
  implements ProjectRepositoryInterface.ProjectRepository
{
  private readonly logger = new Logger(ProjectSequelizeRepository.name);
  constructor(
    @InjectModel(Project) private projectModel: typeof Project,
    @InjectModel(ProjectProduct)
    private projectProductModel: typeof ProjectProduct,
  ) {}

  async findAll(companyId: string): Promise<Project[] | null> {
    this.logger.debug('ProjectSequelizeRepository.findAll: Called');
    return this.projectModel.findAll({
      where: { company_id: companyId },
    });
  }

  async findOne(id: string): Promise<Project | null> {
    this.logger.debug('ProjectSequelizeRepository.findOne: Called');
    return this.projectModel.findOne({ where: { id } });
  }

  async create(
    newProject: ProjectRepositoryInterface.Inputs.createProject,
    items: ProjectRepositoryInterface.Inputs.createProjectItem[],
  ): Promise<Project> {
    this.logger.debug('ProjectSequelizeRepository.create: Called');
    const project = await this.projectModel.create(newProject);
    for (const item of items) {
      await this.projectProductModel.create({
        amount: item.amount,
        productId: item.product_id,
        projectId: project.id,
      });
    }
    return project;
  }

  async update(
    updateProject: ProjectRepositoryInterface.Inputs.updateProject,
  ): Promise<Project> {
    this.logger.debug('ProjectSequelizeRepository.update: Called');
    const project = await this.findOne(updateProject.id);
    return await project.update(updateProject);
  }

  async delete(id: string): Promise<void> {
    this.logger.debug('ProjectSequelizeRepository.delete: Called');
    await this.projectModel.destroy({ where: { id } });
  }
}
