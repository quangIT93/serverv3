import { Injectable } from '@nestjs/common';
import { CreateCommunicationLikeDto } from './dto/create-communication-like.dto';
import { UpdateCommunicationLikeDto } from './dto/update-communication-like.dto';

@Injectable()
export class CommunicationLikesService {
  create(_createCommunicationLikeDto: CreateCommunicationLikeDto) {
    return 'This action adds a new communicationLike';
  }

  findAll() {
    return `This action returns all communicationLikes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} communicationLike`;
  }

  update(id: number, _updateCommunicationLikeDto: UpdateCommunicationLikeDto) {
    return `This action updates a #${id} communicationLike`;
  }

  remove(id: number) {
    return `This action removes a #${id} communicationLike`;
  }
}
