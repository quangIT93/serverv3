import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async updateTypeUser(id: string, typeUser: number) {
    try {
      // const user = await this.usersRepository.findOne({
      //    relations: ['profile', 'profile.company'],
      //   where: {
      //     id,
      //   },
      // });

      // if (!user) {
      //   throw new BadRequestException('User not found');
      // }
      if (typeUser !== 0 && typeUser !== 1) {
        throw new BadRequestException('Type user invalid');
      }

      if (typeUser) {
        await this.usersRepository.update(id, {
          type: typeUser,
        });
      }

    } catch (error) {
      throw error;
    }
  }
}
