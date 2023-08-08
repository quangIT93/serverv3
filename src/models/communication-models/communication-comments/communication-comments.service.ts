import { Injectable } from '@nestjs/common';
import { CreateCommunicationCommentDto } from './dto/create-communication-comment.dto';
import { UpdateCommunicationCommentDto } from './dto/update-communication-comment.dto';

@Injectable()
export class CommunicationCommentsService {
  create(_createCommunicationCommentDto: CreateCommunicationCommentDto) {
    return 'This action adds a new communicationComment';
  }

  findAll() {
    return `This action returns all communicationComments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} communicationComment`;
  }

  update(id: number, _updateCommunicationCommentDto: UpdateCommunicationCommentDto) {
    return `This action updates a #${id} communicationComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} communicationComment`;
  }
}
