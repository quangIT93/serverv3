import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { UpdateCommunicationDto } from './dto/update-communication.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Communication } from './entities/communication.entity';
import { ILike, Repository } from 'typeorm';
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

  async findAll() {
    return await this.communicationRepository.find({
      relations: [
        'communicationImages',
        'communicationCategories',
        'communicationCategories.parentCategory',
        'profile',
        'communicationViews',
        'communicationLikes',
        'communicationComments'
      ],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findCommunicationById(id: string) {
    return await this.communicationRepository.find({
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
      ],
    });
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
    const exitsCommunication = await this.communicationRepository.findOne({
      where: {
        accountId: updateCommunicationDto.accountId,
      },
    });

    if (!exitsCommunication) {
      throw new BadRequestException(
        'Communication not found or communication does not exist of user',
      );
    }

    updateCommunicationDto.status = 0;

    const newUpdate = this.communicationRepository.create(
      updateCommunicationDto,
    );

    await this.communicationRepository.save(newUpdate);
  }

  async searchCommunication(searchTitle: string) {
    const communications = await this.communicationRepository.find({
      relations: [
        'communicationLikes',
        'communicationViews',
        'profile',
        'communicationImages',
        'communicationCategories',
      ],
      where: {
        title: ILike(`%${searchTitle}%`),
      },
    });

    return communications;
  }

  async getCommunicationByCommunicationId(id: number) {
    return await this.communicationRepository.find({
      where: {
        id,
      },
      relations: [
        'communicationImages',
        'communicationCategories',
        'communicationCategories.parentCategory',
        'profile',
        'communicationViews',
        'communicationLikes',
      ],
    });
  }
}
