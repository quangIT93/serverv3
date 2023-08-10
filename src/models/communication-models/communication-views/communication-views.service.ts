import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommunicationViewDto } from './dto/create-communication-view.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunicationView } from './entities/communication-view.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommunicationViewsService {
  constructor(
    @InjectRepository(CommunicationView)
    private readonly communicationViewRepository:Repository<CommunicationView>
  ){}
  async create(createCommunicationViewDto: CreateCommunicationViewDto) {
    try {

      const newCommunicationLike = this.communicationViewRepository.create(
        createCommunicationViewDto,
      );
      return await this.communicationViewRepository.save(newCommunicationLike);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException(
        'Error creating or deleting communication views',
      );
    }
  }

  async findOne(id: number) {
    return await this.communicationViewRepository.find({
      where: {
        communicationId: id,
      },
      relations: ['profile']
    });
  }
  async countCommunicationViews(id: number) {
    try {
      const likeCount = await this.communicationViewRepository.count({
        where: {
          communicationId: id,
        },
      });
      return likeCount;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Error counting communication likes');
    }
  }
}
