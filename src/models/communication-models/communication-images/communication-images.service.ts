import { Injectable } from '@nestjs/common';
import { CreateCommunicationImageDto } from './dto/create-communication-image.dto';
import { UpdateCommunicationImageDto } from './dto/update-communication-image.dto';

@Injectable()
export class CommunicationImagesService {
  create(_createCommunicationImageDto: CreateCommunicationImageDto) {
    return 'This action adds a new communicationImage';
  }

  findAll() {
    return `This action returns all communicationImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} communicationImage`;
  }

  update(id: number, _updateCommunicationImageDto: UpdateCommunicationImageDto) {
    return `This action updates a #${id} communicationImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} communicationImage`;
  }
}
