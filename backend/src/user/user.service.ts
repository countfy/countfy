import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createOne(user: Partial<User>): Promise<User> {
    const newUser = new User();
    Object.assign(newUser, user);
    return await this.userRepository.save(newUser);
  }

  async readOne(id: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  async readPage(page: number, size: number): Promise<User[]> {
    return await this.userRepository.find({
      skip: page * size,
      take: size,
    });
  }

  async updateOne(id: string, user: Partial<User>): Promise<User> {
    const updatedUser = await this.readOne(id);
    Object.assign(updatedUser, user);
    return await updatedUser.save();
  }

  async deleteOne(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async readByEmail(email: string): Promise<User> {
    const user = this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    return user;
  }
}
