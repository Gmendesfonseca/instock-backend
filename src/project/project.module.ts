import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Project } from './project.model';
import { ProjectService } from './project.service';
import { ProjectServiceInterface } from './interface/project.service.interface';
import { ProjectRepositoryInterface } from './interface/project.repository.interface';
import { ProjectSequelizeRepository } from './repositories/project.sequelize.repository';
import { ProjectController } from './project.controller';

@Module({
  imports: [SequelizeModule.forFeature([Project])],
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
