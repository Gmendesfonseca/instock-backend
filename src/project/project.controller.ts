import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectServiceInterface } from './interface/project.service.interface';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('/projects')
export class ProjectController {
  private readonly logger = new Logger(ProjectController.name);

  constructor(
    private readonly projectService: ProjectServiceInterface.ProjectService,
  ) {}

  @Get('/companies/:company_id')
  @HttpCode(200)
  getProjectsByCompany(company_id: string) {
    this.logger.debug('ProjectController.getProjectsByCompany: Called');
    return this.projectService.findAll(company_id);
  }

  @Get('/:id')
  @HttpCode(200)
  getProject(id: string) {
    this.logger.debug('ProjectController.getProject: Called');
    return this.projectService.findOne(id);
  }

  @Post('/')
  @HttpCode(201)
  createProject(@Body() body: CreateProjectDto) {
    this.logger.debug('ProjectController.createProject: Called');
    return this.projectService.create(body);
  }

  @Put('/:id')
  @HttpCode(204)
  updateProject(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateProjectDto,
  ) {
    this.logger.debug('ProjectController.updateProject: Called');
    return this.projectService.update({ id, ...body });
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteProject(@Param('id', new ParseUUIDPipe()) id: string) {
    this.logger.debug('ProjectController.deleteProject: Called');
    return this.projectService.delete(id);
  }
}
