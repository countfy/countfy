import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProject } from './user-project.entity';
import { User } from 'src/user/users.entity';
import { Project } from 'src/project/project.entity';

@Injectable()
export class UserProjectService {
  private readonly logger: Logger = new Logger(UserProjectService.name);
  constructor(
    @InjectRepository(UserProject)
    private readonly userProjectRepository: Repository<UserProject>,
  ) {}

  public async createOne(
    userProjectData: Partial<UserProject>,
  ): Promise<UserProject> {
    const newUserProject = new UserProject();
    Object.assign(newUserProject, userProjectData);
    await newUserProject.save();
    return newUserProject;
  }

  public async readPage(page: number, size: number): Promise<UserProject[]> {
    this.logger.debug(`readPage: page=${page}, size=${size}`);
    return await this.userProjectRepository.find({
      skip: page * size,
      take: size,
    });
  }

  public async updateOne(
    id: string,
    userProject: Partial<UserProject>,
  ): Promise<UserProject> {
    const updatedUserProject = await this.readOne(id);
    Object.assign(updatedUserProject, userProject);
    return await updatedUserProject.save();
  }

  public async readOne(id: string): Promise<UserProject> {
    return await this.userProjectRepository.findOneBy({ id });
  }

  public async deleteOne(id: string): Promise<UserProject> {
    this.logger.debug(`deleteOne: id=${id}`);
    const deleted = await this.userProjectRepository.delete(id);
    if (deleted) {
      return deleted.raw;
    }
    return null;
  }

  public async readProjectUsersPage(
    projectId: string,
    page: number,
    size: number,
  ): Promise<User[]> {
    const users = await this.userProjectRepository
      .createQueryBuilder('userProject')
      .where('userProject.projectId = :projectId', { projectId })
      .skip(page * size)
      .take(size)
      .getMany();

    return users.map((userProject) => userProject.user);
  }

  public async readUserProjectsPage(
    userId: string,
    page: number,
    size: number,
  ): Promise<Project[]> {
    const projects = await this.userProjectRepository
      .createQueryBuilder('userProject')
      .where('userProject.userId = :userId', { userId })
      .skip(page * size)
      .take(size)
      .getMany();

    return projects.map((userProject) => userProject.project);
  }
}
