import { Injectable } from '@nestjs/common';

@Injectable()
export class PostMediasService {
  async create() {
    console.log('first');
    return 'OK';
  }
}
