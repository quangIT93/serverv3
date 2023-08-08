import { Injectable } from '@nestjs/common';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { UpdateCommunicationDto } from './dto/update-communication.dto';

@Injectable()
export class CommunicationsService {
  create(_createCommunicationDto: CreateCommunicationDto) {
    return 'This action adds a new communication';
  }

  findAll() {
    return `This action returns all communications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} communication`;
  }

  update(id: number, _updateCommunicationDto: UpdateCommunicationDto) {
    return `This action updates a #${id} communication`;
  }

  remove(id: number) {
    return `This action removes a #${id} communication`;
  }
}
