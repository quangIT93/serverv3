import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    async findByEmail(email: string): Promise<User | null> {
        return await this.usersRepository.findOne({
            where: {
                email,
            },
        });
    }
}
