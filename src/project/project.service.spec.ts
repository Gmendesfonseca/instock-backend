import { ProjectRepositoryInterface } from './interface/project.repository.interface';
import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let projectService: ProjectService;
  let projectRepository: ProjectRepositoryInterface.ProjectRepository;

  beforeEach(() => {
    projectRepository = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as unknown as ProjectRepositoryInterface.ProjectRepository;

    projectService = new ProjectService(projectRepository);
  });

  describe('findAll', () => {
    it('should return all projects for a given company', async () => {
      const companyId = 'company123';
      const projects = [{ id: '1', name: 'Project 1' }];
      jest.spyOn(projectRepository, 'findAll').mockResolvedValue(projects);

      const result = await projectService.findAll(companyId);

      expect(result).toBe(projects);
      expect(projectRepository.findAll).toHaveBeenCalledWith(companyId);
    });
  });

  describe('findOne', () => {
    it('should return a project by id', async () => {
      const projectId = 'project123';
      const project = { id: 'project123', name: 'Project 1' };
      jest.spyOn(projectRepository, 'findOne').mockResolvedValue(project);

      const result = await projectService.findOne(projectId);

      expect(result).toBe(project);
      expect(projectRepository.findOne).toHaveBeenCalledWith(projectId);
    });
  });

  describe('create', () => {
    it('should create a new project', async () => {
      const newProject = { name: 'New Project' };
      const createdProject = { id: 'project123', ...newProject };
      jest.spyOn(projectRepository, 'create').mockResolvedValue(createdProject);

      const result = await projectService.create(newProject);

      expect(result).toBe(createdProject);
      expect(projectRepository.create).toHaveBeenCalledWith(newProject);
    });
  });

  describe('update', () => {
    it('should update an existing project', async () => {
      const updateProject = { id: 'project123', name: 'Updated Project' };
      const updatedProject = { ...updateProject };
      jest.spyOn(projectRepository, 'update').mockResolvedValue(updatedProject);

      const result = await projectService.update(updateProject);

      expect(result).toBe(updatedProject);
      expect(projectRepository.update).toHaveBeenCalledWith(updateProject);
    });
  });

  describe('delete', () => {
    it('should delete a project by id', async () => {
      const projectId = 'project123';
      jest.spyOn(projectRepository, 'delete').mockResolvedValue(undefined);

      const result = await projectService.delete(projectId);

      expect(result).toBeUndefined();
      expect(projectRepository.delete).toHaveBeenCalledWith(projectId);
    });
  });
});
