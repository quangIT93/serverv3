import { Injectable } from '@nestjs/common';
import { CreateCommunicationCommentDto } from './dto/create-communication-comment.dto';
import { UpdateCommunicationCommentDto } from './dto/update-communication-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunicationComment } from './entities/communication-comment.entity';
import { Repository } from 'typeorm';
import { CreateCommunicationCommentTransaction } from './transactions/create-communication-comment.transaction';
import { UpdateCommunicationCommentTransaction } from './transactions/update-communication-comment.transaction';

@Injectable()
export class CommunicationCommentsService {
  constructor(
    @InjectRepository(CommunicationComment)
    private readonly communicationCommentRepository: Repository<CommunicationComment>,
    private readonly createCommunicationCommentTransaction: CreateCommunicationCommentTransaction,
    private readonly updateCommunicationCommentTransaction: UpdateCommunicationCommentTransaction,
  ) {}
  async create(createCommunicationCommentDto: CreateCommunicationCommentDto) {
    try {
      const newCommunicationComment =
        await this.createCommunicationCommentTransaction.run(
          createCommunicationCommentDto,
        );

      return newCommunicationComment;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    return await this.communicationCommentRepository.find({
      where: { communicationId: id },
      relations: ['communicationCommentImages', 'profile'],
    });
  }

  async update(updateCommunicationCommentDto: UpdateCommunicationCommentDto) {
    try {
      const newCommunicationComment =
        await this.updateCommunicationCommentTransaction.run(
          updateCommunicationCommentDto,
        );

      return newCommunicationComment;
    } catch (error) {
      throw error;
    }
  }

  //count communication comments by communication id
  async countCommunicationComments(communicationId: number) {
    return await this.communicationCommentRepository.count({
      where: { communicationId },
    });
  }
}
