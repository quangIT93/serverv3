import { Injectable } from '@nestjs/common';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { UpdateCommunicationDto } from './dto/update-communication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Communication } from './entities/communication.entity';
import { Repository } from 'typeorm';
import { CreateCommunicationTransaction } from './transactions/create-communication.transaction';
import { UpdateCommunicationTransaction } from './transactions/update-communication.transaction';
import { UpdateCommunicationAdminTransaction } from './transactions/update-communication-admin.transaction';
// import { CommunicationCommentsService } from '../communication-comments/communication-comments.service';
// import { CommunicationLikesService } from '../communication-likes/communication-likes.service';
// import { CommunicationViewsService } from '../communication-views/communication-views.service';

@Injectable()
export class CommunicationsService {
  constructor(
    @InjectRepository(Communication)
    private readonly communicationRepository: Repository<Communication>,
    private readonly createCommunicationTransaction: CreateCommunicationTransaction,
    private readonly updateCommunicationTransaction: UpdateCommunicationTransaction,
    private readonly updateCommunicationAdminTransaction: UpdateCommunicationAdminTransaction, // private readonly communicationLikesService: CommunicationLikesService, // private readonly communicationViewsService: CommunicationViewsService, // private readonly communicationCommentsService: CommunicationCommentsService,
  ) {}

  handleSort(data: Communication[], sort?: string) {
    if (sort === 'l') {
      const dataWithLikesLength = data.map((item) => {
        return {
          ...item,
          communicationLikesLength: item.communicationLikes.length,
        };
      });

      const sortedData = dataWithLikesLength.sort((a, b) => {
        return b.communicationLikesLength - a.communicationLikesLength;
      });

      return sortedData;
    } else if (sort === 'v') {
      const dataWithViewsLength = data.map((item) => {
        return {
          ...item,
          communicationViewsLength: item.communicationViews.length,
        };
      });

      const sortedData = dataWithViewsLength.sort((a, b) => {
        return b.communicationViewsLength - a.communicationViewsLength;
      });

      return sortedData;
    } else if (sort === 'cm') {
      const dataWithCommentsLength = data.map((item) => {
        return {
          ...item,
          communicationCommentsLength: item.communicationComments.length,
        };
      });

      const sortedData = dataWithCommentsLength.sort((a, b) => {
        return b.communicationCommentsLength - a.communicationCommentsLength;
      });

      return sortedData;
    }

    return data;
  }

  async create(createCommunicationDto: CreateCommunicationDto) {
    try {
      const newCommunication = await this.createCommunicationTransaction.run(
        createCommunicationDto,
      );

      return newCommunication;
    } catch (error) {
      throw error;
    }
  }

  // find by account

  async findCommunicationByAccountId(
    id: string,
    limit: number,
    page: number,
    sort?: string,
  ) {
    const data = await this.communicationRepository.find({
      where: {
        accountId: id,
      },
      relations: [
        'communicationImages',
        'communicationCategories',
        'communicationCategories.parentCategory',
        'profile',
        'communicationViews',
        'communicationLikes',
        'communicationComments',
      ],
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: page * limit,
    });

    return this.handleSort(data, sort);
  }

  async update(updateCommunicationDto: UpdateCommunicationDto) {
    try {
      const newCommunication = await this.updateCommunicationTransaction.run(
        updateCommunicationDto,
      );

      return newCommunication;
    } catch (error) {
      throw error;
    }
  }

  async getCommunicationByCommunicationId(id: number) {
    return this.communicationRepository.findOne({
      relations: [
        'communicationImages',
        'communicationCategories',
        'communicationCategories.parentCategory',
        'profile',
        'communicationViews',
        'communicationLikes',
        'communicationComments',
        'communicationComments.profile',
        'communicationComments.communicationCommentImages',
      ],
      where: {
        id,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  // update by admin

  async updateByAdmin(updateCommunicationDto: UpdateCommunicationDto) {
    try {
      const newCommunication =
        await this.updateCommunicationAdminTransaction.run(
          updateCommunicationDto,
        );

      return newCommunication;
    } catch (error) {
      throw error;
    }
  }

  // find five working story
  async findCommunicationsByType(
    limit: number,
    page: number,
    type: number = 0,
    sort?: string,
    accountId?: string,
  ) {
    const queryBuilder = this.communicationRepository
      .createQueryBuilder('communications')
      .select([
        'communications.id',
        'communications.title',
        'communications.content',
        'communications.type',
        'communications.createdAt',
        'communications.updatedAt',
        'communications.status',
      ])
      .addSelect(
        'COUNT(DISTINCT communicationLikes.communicationId)',
        'communicationLikesCount',
      )
      .addSelect(
        'COUNT(DISTINCT communicationViews.communicationId)',
        'communicationViewsCount',
      )
      .addSelect(
        'COUNT(DISTINCT communicationComments.communicationId)',
        'communicationCommentsCount',
      )
      .leftJoinAndSelect(
        'communications.communicationImages',
        'communicationImages',
      )
      .leftJoinAndSelect(
        'communications.communicationCategories',
        'communicationCategories',
      )
      .leftJoinAndSelect(
        'communicationCategories.parentCategory',
        'parentCategory',
      )
      .leftJoinAndSelect('communications.profile', 'profile')
      .leftJoinAndSelect(
        'communications.communicationViews',
        'communicationViews',
      )
      .loadRelationCountAndMap(
        'communications.communicationViewsCount',
        'communications.communicationViews',
      )
      .leftJoinAndSelect(
        'communications.communicationLikes',
        'communicationLikes',
      )
      .loadRelationCountAndMap(
        'communications.communicationLikesCount',
        'communications.communicationLikes',
      )
      .leftJoinAndSelect(
        'communications.communicationComments',
        'communicationComments',
      )
      .leftJoinAndSelect(
        'communications.communicationLikes',
        'communicationLikesChecked', 
        'communicationLikesChecked.accountId = :accountId',
      )
      .leftJoinAndSelect(
        'communications.communicationBookmarked',
        'communicationBookmarked',
        'communicationBookmarked.accountId = :accountId',
      )
      .leftJoinAndSelect(
        'communications.communicationViews',
        'communicationViewsChecked', 
        'communicationViewsChecked.accountId = :accountId',
      )
      .loadRelationCountAndMap(
        'communications.communicationCommentsCount',
        'communications.communicationComments',
      )
      .where('communications.type = :type', { type })
      .groupBy('communications.id');
    // .orderBy('communicationLikesCount', 'DESC')

    queryBuilder.setParameter('accountId', accountId);

    switch (sort) {
      case 'l': // likes
        queryBuilder
          .orderBy('communicationLikesCount', 'DESC')
          .addOrderBy('communications.id', 'DESC');

        break;

      case 'v': // views
        queryBuilder
          .orderBy('communicationViewsCount', 'DESC')
          .addOrderBy('communications.id', 'DESC');

        break;

      case 'cm': // comments
        queryBuilder
          .orderBy('communicationCommentsCount', 'DESC')
          .addOrderBy('communications.id', 'DESC');

        break;

      default:
        queryBuilder.orderBy('communications.id', 'DESC');
        break;
    }

    return await queryBuilder
      .skip(page * limit)
      .take(limit)
      .getMany();
  }
}
