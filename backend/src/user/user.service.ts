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

  public async createOne(user: Partial<User>): Promise<User> {
    const newUser = new User();
    Object.assign(newUser, user);
    await newUser.save();
    return newUser;
  }

  public async readOne(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  public async readPage(page: number, size: number): Promise<User[]> {
    return await this.userRepository.find({
      skip: page * size,
      take: size,
    });
  }

  public async updateOne(id: string, user: Partial<User>): Promise<User> {
    const updatedUser = await this.readOne(id);
    Object.assign(updatedUser, user);
    return await updatedUser.save();
  }

  public async deleteOne(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  public async readByEmail(email: string): Promise<User> {
    const user = this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    return user;
  }
}
