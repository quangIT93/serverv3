import { Injectable } from '@nestjs/common';
import { CreateCommunicationCommentImageDto } from './dto/create-communication-comment-image.dto';
import { UpdateCommunicationCommentImageDto } from './dto/update-communication-comment-image.dto';

@Injectable()
export class CommunicationCommentImagesService {
  create(_createCommunicationCommentImageDto: CreateCommunicationCommentImageDto) {
    return 'This action adds a new communicationCommentImage';
  }

  findAll() {
    return `This action returns all communicationCommentImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} communicationCommentImage`;
  }

  update(id: number, _updateCommunicationCommentImageDto: UpdateCommunicationCommentImageDto) {
    return `This action updates a #${id} communicationCommentImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} communicationCommentImage`;
  }
}
