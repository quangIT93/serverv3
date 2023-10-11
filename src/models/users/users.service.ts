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
      if (typeUser !== 0 && typeUser !== 1) {
        throw new BadRequestException('Type user invalid');
      }

      await this.usersRepository.update(id, {
        type: typeUser,
      });
    } catch (error) {
      throw error;
    }
  }

  async findByIdAndType(accountId: string) {
    try {
      return await this.usersRepository.findOne({
        where: {
          id: accountId,
          type: 1,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findRoleById(accountId: string) {
    try {
      return await this.usersRepository.findOne({
        where: {
          id: accountId,
        },
        select: ['role', 'email', 'id', 'type'],
      });
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      return await this.usersRepository.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
