import { BadRequestException, Controller, Post } from '@nestjs/common';
import { PostMediasService } from './post-medias.service';

@Controller('post-medias')
export class PostMediasController {
  constructor(private readonly postMediasService: PostMediasService) {}

  @Post()
  async create() {
    try {
      await this.postMediasService.create();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new BadRequestException('Posting error');
    }
  }
}
