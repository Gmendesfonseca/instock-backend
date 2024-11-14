import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './project.model';
import { ProjectService } from './project.service';
import { ProjectServiceInterface } from './interface/project.service.interface';
import { ProjectRepositoryInterface } from './interface/project.repository.interface';
import { ProjectSequelizeRepository } from './repositories/project.sequelize.repository';
import { ProjectController } from './project.controller';
import { ProjectProduct } from 'src/project-product/product-project.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Project]),
    SequelizeModule.forFeature([ProjectProduct]),
  ],
  providers: [
    {
      provide: ProjectRepositoryInterface.ProjectRepository,
      useClass: ProjectSequelizeRepository,
    },
    {
      provide: ProjectServiceInterface.ProjectService,
      useClass: ProjectService,
    },
  ],
  controllers: [ProjectController],
  exports: [],
})
export class ProjectModule {}
