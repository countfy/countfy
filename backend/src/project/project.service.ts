import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
@Injectable()
export class ProjectService {
  private readonly logger: Logger = new Logger(ProjectService.name);
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}
  public async createOne(projectData: Partial<Project>): Promise<Project> {
    const newProject = new Project();
    Object.assign(newProject, projectData);
    await newProject.save();
    return newProject;
  }

  public async readPage(page: number, size: number): Promise<Project[]> {
    this.logger.debug(`readPage: page=${page}, size=${size}`);
    return await this.projectRepository.find({
      skip: page * size,
      take: size,
    });
  }
  public async updateOne(
    id: string,
    project: Partial<Project>,
  ): Promise<Project> {
    const updatedProject = await this.readOne(id);
    Object.assign(updatedProject, project);
    return await updatedProject.save();
  }
  public async readOne(id: string): Promise<Project> {
    return await this.projectRepository.findOneBy({ id });
  }

  public async deleteOne(id: string): Promise<Project> {
    this.logger.debug(`deleteOne: id=${id}`);
    const deleted = await this.projectRepository.delete(id);
    if (deleted) {
      return deleted.raw;
    }
    return null;
  }
}
