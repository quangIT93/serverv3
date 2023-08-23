import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommunicationBookmarkedDto } from './dto/create-communication-bookmarked.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunicationBookmarked } from './entities/communication-bookmarked.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommunicationBookmarkedService {
  constructor(
    @InjectRepository(CommunicationBookmarked)
    private readonly communicationBookmarkedRepository: Repository<CommunicationBookmarked>,
  ) {}
  async create(
    createCommunicationBookmarkedDto: CreateCommunicationBookmarkedDto,
  ) {
    try {
      const existing = await this.communicationBookmarkedRepository.findOne({
        where: {
          communicationId: createCommunicationBookmarkedDto.communicationId,
          accountId: createCommunicationBookmarkedDto.accountId,
        },
      });

      if (existing) {
        await this.communicationBookmarkedRepository.delete({
          communicationId: createCommunicationBookmarkedDto.communicationId,
          accountId: createCommunicationBookmarkedDto.accountId,
        });
        return;
      }

      const newCommunicationBookmarked =
        this.communicationBookmarkedRepository.create(
          createCommunicationBookmarkedDto,
        );
      return await this.communicationBookmarkedRepository.save(
        newCommunicationBookmarked,
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException(
        'Error creating or deleting communication likes',
      );
    }
  }

  async findOne(id: string) {
    const queryBuilder = this.communicationBookmarkedRepository
      .createQueryBuilder('communicationBookmarked')
      .leftJoinAndSelect(
        'communicationBookmarked.communication',
        'communication',
      )
      .leftJoinAndSelect(
        'communication.communicationLikes',
        'communicationLikes',
      )
      .leftJoinAndSelect(
        'communication.communicationViews',
        'communicationViews',
      )
      .leftJoinAndSelect(
        'communication.communicationComments',
        'communicationComments',
      )
      .leftJoinAndSelect(
        'communication.communicationImages',
        'communicationImages',
      )
      .leftJoinAndSelect('communication.profile', 'profile')
      .loadRelationCountAndMap(
        'communication.communicationLikesCount',
        'communication.communicationLikes',
        'communicationLikesCount',
      )
      .loadRelationCountAndMap(
        'communication.communicationViewsCount',
        'communication.communicationViews',
        'communicationViewsCount',
      )
      .loadRelationCountAndMap(
        'communication.communicationCommentsCount',
        'communication.communicationComments',
        'communicationCommentsCount',
      )
      .where('communicationBookmarked.accountId = :id', { id });

    const result = await queryBuilder.getMany();
    return result;
  }
}
