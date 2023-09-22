import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private readonly logger: Logger = new Logger(UserService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcryptService: BcryptService,
  ) {}

  public async createOne(userData: CreateUserDto): Promise<User> {
    const newUser = new User();
    Object.assign(newUser, userData);
    newUser.password = await this.bcryptService.hashPassword(userData.password);
    await newUser.save();
    return newUser;
  }

  public async readOne(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  public async readPage(page: number, size: number): Promise<User[]> {
    this.logger.debug(`readPage: page=${page}, size=${size}`);
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

  public async deleteOne(id: string): Promise<User> {
    this.logger.debug(`deleteOne: id=${id}`);
    const deleted = await this.userRepository.delete(id);
    if (deleted) {
      return deleted.raw;
    }
    return null;
  }

  public async readByEmail(email: string): Promise<User> {
    const user = this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    return user;
  }
}
