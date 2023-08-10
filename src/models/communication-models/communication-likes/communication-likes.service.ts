import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommunicationLikeDto } from './dto/create-communication-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommunicationLike } from './entities/communication-like.entity';

@Injectable()
export class CommunicationLikesService {
  constructor(
    @InjectRepository(CommunicationLike)
    private readonly communicationsLikeRepository: Repository<CommunicationLike>,
  ) {}
  async createOrDelete(createCommunicationLikeDto: CreateCommunicationLikeDto) {
    try {
      const existingLike = await this.communicationsLikeRepository.findOne({
        where: {
          communicationId: createCommunicationLikeDto.communicationId,
          accountId: createCommunicationLikeDto.accountId,
        },
      });

      if (existingLike) {
        await this.communicationsLikeRepository.delete({
          communicationId: createCommunicationLikeDto.communicationId,
          accountId: createCommunicationLikeDto.accountId,
        });
        return 'Unlike successfully';
      }

      const newCommunicationLike = this.communicationsLikeRepository.create(
        createCommunicationLikeDto,
      );
      return await this.communicationsLikeRepository.save(newCommunicationLike);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException(
        'Error creating or deleting communication likes',
      );
    }
  }

  async findOne(id: number) {
    try {
      return await this.communicationsLikeRepository.find({
        where: {
          communicationId: id,
        },
        relations: ['profile']
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error finding communication likes');
    }
  }

}
