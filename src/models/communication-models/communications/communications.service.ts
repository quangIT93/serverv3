import { Injectable } from '@nestjs/common';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { UpdateCommunicationDto } from './dto/update-communication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Communication } from './entities/communication.entity';
import { Between, Repository } from 'typeorm';
import { CreateCommunicationTransaction } from './transactions/create-communication.transaction';
import { UpdateCommunicationTransaction } from './transactions/update-communication.transaction';

@Injectable()
export class CommunicationsService {
  constructor(
    @InjectRepository(Communication)
    private readonly communicationRepository: Repository<Communication>,
    private readonly createCommunicationTransaction: CreateCommunicationTransaction,
    private readonly updateCommunicationTransaction: UpdateCommunicationTransaction,
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

  async findAll(limit: number, page: number, sort?: string) {
    const skip = (page - 1) * limit;
    const data = await this.communicationRepository.find({
      relations: [
        'communicationImages',
        'communicationCategories',
        'communicationCategories.parentCategory',
        'profile',
        'communicationViews',
        'communicationLikes',
        'communicationComments',
        'communicationComments.profile',
      ],
      order: {
        createdAt: 'DESC',
      },
      skip,
      take: limit,
    });

    // sort by likes, comments, views
    return this.handleSort(data, sort);
  }

  async findCommunicationTodayByAccountId(
    id: string,
    limit: number,
    page: number,
    sort?: string,
  ) {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999,
    );

    const skip = (page - 1) * limit;
    const data = await this.communicationRepository.find({
      where: {
        accountId: id,
        createdAt: Between(startOfDay, endOfDay),
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
      skip,
      take: limit,
    });

    return this.handleSort(data, sort);
  }

  // find by account

  async findCommunicationByAccountId(
    id: string,
    limit: number,
    page: number,
    sort?: string,
  ) {

    const skip = (page - 1) * limit;
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
      skip,
      take: limit,
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

  async remove(updateCommunicationDto: UpdateCommunicationDto) {
    updateCommunicationDto.status = 0;

    const newUpdate = this.communicationRepository.create(
      updateCommunicationDto,
    );

    await this.communicationRepository.save(newUpdate);
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
        'communicationComments.communicationCommentImages'
      ],
      where: {
        id,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getCommunicationToday(limit: number, page: number, sort?: string) {
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999,
    );
    const skip = (page - 1) * limit;
    const data = await this.communicationRepository.find({
      where: {
        createdAt: Between(startOfDay, endOfDay),
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
      skip,
      take: limit,
    });

    return this.handleSort(data, sort);
  }

  async shareCommunication(id: number) {
    return {
      id,
      share_link: 'https://hijob.site/',
    };
  }
}
