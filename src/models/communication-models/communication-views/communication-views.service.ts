import { Injectable } from '@nestjs/common';
import { CreateCommunicationViewDto } from './dto/create-communication-view.dto';
import { UpdateCommunicationViewDto } from './dto/update-communication-view.dto';

@Injectable()
export class CommunicationViewsService {
  create(_createCommunicationViewDto: CreateCommunicationViewDto) {
    return 'This action adds a new communicationView';
  }

  findAll() {
    return `This action returns all communicationViews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} communicationView`;
  }

  update(id: number, _updateCommunicationViewDto: UpdateCommunicationViewDto) {
    return `This action updates a #${id} communicationView`;
  }

  remove(id: number) {
    return `This action removes a #${id} communicationView`;
  }
}
