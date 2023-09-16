import { Injectable, Logger } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    private readonly logger: Logger = new Logger(UsersService.name);
    constructor(
        @InjectableRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
    }

    async createOne(user: Partial<User>): Promise<User> {
        const newUser = new User();
        Object.assign(newUser, user);
        return await newUser.save();
    }

    async readOne(id: string): Promise<User> {
        return await User.findOne(id);
    }

    async readPage(page: number, size: number): Promise<User[]> {
        return await User.find({
            skip: page * size,
            take: size,
        });
    }

    async updateOne(id: string, user: Partial<User>): Promise<User> {
        const updatedUser = await User.findOne(id);
        Object.assign(updatedUser, user);
        return await updatedUser.save();
    }

    async deleteOne(id: string): Promise<void> {
        await User.delete(id);
    }

    async readByEmail(email: string): Promise<User> {
        const user = User.
}
