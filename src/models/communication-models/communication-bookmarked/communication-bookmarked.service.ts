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
        return 'Unsave successfully';
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

  findOne(id: string) {
    return this.communicationBookmarkedRepository.find({
      where: {
        accountId: id,
      },
      relations: [
        'communication',
        'communication.communicationImages',
        'communication.communicationLikes',
        'communication.communicationViews',
        'communication.communicationComments',
      ],
    });
  }
}
