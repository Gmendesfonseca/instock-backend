import { Test, TestingModule } from '@nestjs/testing';
import { ProjectServiceInterface } from './interface/project.service.interface';
import { ProjectController } from './project.controller';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-user.dto';

describe('ProjectController', () => {
  let projectController: ProjectController;
  let projectService: ProjectServiceInterface.ProjectService;

  const mockProjectService = () => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  });

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectController],
      providers: [
        {
          provide: ProjectServiceInterface.ProjectService,
          useValue: mockProjectService(),
        },
      ],
    }).compile();

    projectController = module.get<ProjectController>(ProjectController);
    projectService = module.get<ProjectServiceInterface.ProjectService>(
      ProjectServiceInterface.ProjectService,
    );
  });

  describe('getProjectsByCompany', () => {
    it('should call projectService.findAll with the correct parameters', () => {
      const companyId = '1';
      projectController.getProjectsByCompany(companyId);
      expect(projectService.findAll).toHaveBeenCalledWith(companyId);
    });

    it('should return the result of projectService.findAll', () => {
      const project1 = {
        id: '1',
        name: 'test project',
        amount: 1000,
        client: '1',
        description: 'test description',
        status: 'test status',
        start_date: new Date(),
        end_date: new Date(),
      };
      const project2 = {
        id: '2',
        name: 'test project 2',
        amount: 1000,
        client: '1',
        description: 'test description',
        status: 'test status',
        start_date: new Date(),
        end_date: new Date(),
      };
      const companyId = '1';
      const result = [project1, project2];
      (projectService.findAll as jest.Mock).mockResolvedValue(result);

      expect(
        projectController.getProjectsByCompany(companyId),
      ).resolves.toEqual(result);
    });
  });

  describe('getProject', () => {
    it('should call projectService.findOne with the correct parameters', () => {
      const id = '1';
      projectController.getProject(id);
      expect(projectService.findOne).toHaveBeenCalledWith(id);
    });

    it('should return the result of projectService.findOne', () => {
      const id = '1';
      const result = {
        id: '1',
        name: 'test project',
        amount: 1000,
        client: '1',
        description: 'test description',
        status: 'test status',
        start_date: new Date(),
        end_date: new Date(),
      };
      (projectService.findOne as jest.Mock).mockResolvedValue(result);

      expect(projectController.getProject(id)).resolves.toEqual(result);
    });
  });

  describe('createProject', () => {
    const end_date = new Date();
    const start_date = new Date();
    const body: CreateProjectDto = {
      name: 'test project',
      amount: 1000,
      client: '1',
      description: 'test description',
      status: 'test status',
      start_date: start_date,
      end_date: end_date,
    };
    it('should call projectService.create with the correct parameters', () => {
      projectController.createProject(body);
      expect(projectService.create).toHaveBeenCalledWith(body);
    });

    it('should return the result of projectService.create', () => {
      const result = {
        id: '1',
        ...body,
      };
      (projectService.create as jest.Mock).mockResolvedValue(result);

      expect(projectController.createProject(body)).resolves.toEqual(result);
    });
  });

  describe('updateProject', () => {
    const body: UpdateProjectDto = {
      name: 'test project',
      amount: 1000,
      client: '1',
      description: 'test description',
      status: 'test status',
      start_date: new Date(),
      end_date: new Date(),
    };
    it('should call projectService.update with the correct parameters', () => {
      const id = '1';
      projectController.updateProject(id, body);
      expect(projectService.update).toHaveBeenCalledWith({ id, ...body });
    });

    it('should return the result of projectService.update', () => {
      const id = '1';
      const result = { id: '1', name: 'test project' };
      (projectService.update as jest.Mock).mockResolvedValue(result);

      expect(projectController.updateProject(id, body)).resolves.toEqual(
        result,
      );
    });
  });

  describe('deleteProject', () => {
    it('should call projectService.delete with the correct parameters', () => {
      const id = '1';
      projectController.deleteProject(id);
      expect(projectService.delete).toHaveBeenCalledWith(id);
    });
  });
});
